const fs = require('fs');
const axios = require("axios");

class Busquedas {
  historial = [];
    dbPath='./db/database.json';
  constructor() {
    //TODO: leer db si existe
    this.leerDB();
  }
  get historialCapitalizado(){
    //capitaliizar cada palabra
    return this.historial.map(lugar=>{
      let palabras = lugar.split(", ");
      
      palabras=palabras.map(palabra=>palabra[0].toUpperCase()+palabra.substring(1))

      return palabras.join(', ');
    });
    
  }

  get paramsMapbox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }
  async ciudad(ciudad = "") {
    try {
      //*peticion http
      //link de el mapbox
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
        //parametros de que son los de despues de ?
        params: this.paramsMapbox,
      });

      const resp = await instance.get();
      return resp.data.features.map((lugar) => ({
        id: lugar.id,
        nombre: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      })); //* Retornar las ciudades que se parescan
    } catch (error) {
      return [""]; //* Retornar las ciudades que se parescan
    }
  }
  async climaLugar(lat,lon){
    try {
        //instancia de axios.create()
        let instance = axios.create({
            baseURL:'https://api.openweathermap.org/data/2.5/weather',

            //*lat=21.44417&lon=-104.90167&appid=412ced1e2f5a08883432fe8c1f63884b&units=metric&lang=es
            params : {
                lat, //eso es igual a lat=lat
                lon,
                appid: process.env.OPENWEATHER_KEY,
                'units':'metric',
                'lang' :'es'
            }

            
        });
        //resp extraer la informacion de la data
        let resp = await instance.get();
        
         return{
            desc:resp.data.weather[0].description,
            min:resp.data.main.temp_min,
            max:resp.data.main.temp_max,
            temp:resp.data.main.temp
        }  
    } catch (error) {
        console.log(error);
    }

  }

  agregarHistorial(lugar = ''){
    //TODO: prevenir duplicados
    if(this.historial.includes(lugar.toLocaleLowerCase())){ //! como es string se puede usar el inclides si lo inlceye no lo agregas
        return;
    }
    this.historial=this.historial.splice(0,5);//! se dejeran en el historial solamente del numero 0 al 5
    this.historial.unshift( lugar.toLocaleLowerCase());
    //grabar en DB

    this.grabarDB();

  }
  grabarDB(){
    const payload={
        historial:this.historial
    }
    fs.writeFileSync(this.dbPath,JSON.stringify(payload));
  }
  leerDB(){
    console.log('leyendo db');
    //verificar que exista
    if(!fs.existsSync(this.dbPath)){return null};
    //const info ---- readlfiesync path encooding 
    const info = fs.readFileSync(this.dbPath, {encoding:'utf8'})//extrayendo la infomracion
    const data= JSON.parse(info);//convirtiendolo a JSON
    
    this.historial= data.historial; //estoy igualando la informacion del json a el arreglo historial
  }

}

module.exports = Busquedas;
