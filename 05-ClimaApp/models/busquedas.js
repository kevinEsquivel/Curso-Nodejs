
const axios = require('axios')

class Busquedas{
    historial=['xalisco','ciudad de mexico','madrid']

    constructor(){
        //TODO: leer db si existe
    }

    get paramsMapbox(){
        return{
            'access_token':process.env.MAPBOX_KEY,
            'limit':5,
            'language':'es'
        }
    }
    async ciudad( ciudad=''){
        
try {
    //*peticion http
//link de el mapbox
    const instance = axios.create({
        baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ciudad}.json`,
        //parametros de que son los de despues de ?
        params: this.paramsMapbox
        
    });
    
    const resp = await instance.get();
    console.log('esto es',resp.data);
    return [''];//* Retornar las ciudades que se parescan 
} catch (error) {
    return [''];//* Retornar las ciudades que se parescan 
}

        
    }

}

module.exports = Busquedas;