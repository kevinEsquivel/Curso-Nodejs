require("dotenv").config();

const {
  leerInput,
  inquirerMenu,
  pausa,
  listadoLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  let menu;
  const busquedas = new Busquedas();
  do {
    menu = await inquirerMenu();

    switch (menu) {
      case 1:
        //mosrar mensaje
        const lugar = await leerInput("Ciudad a buscar: ");

        //buscar ciudad
        const lugares = await busquedas.ciudad(lugar);
        


        //seleccionar ciudad
        const id = await listadoLugares(lugares);
        if(id==='0')continue;
        const lugSelec = lugares.find((lugar) => lugar.id === id);
        

        //!guardar en db
        busquedas.agregarHistorial(lugSelec.nombre);
        //clima de la ciudad
        const clima = await busquedas.climaLugar(lugSelec.lat, lugSelec.lng);
        //mostrar resultados
        console.log("\n Informacion de la cudada\n".green);
        console.log("Ciudad: ".blue, lugSelec.nombre);
        console.log("Lat: ".blue, lugSelec.lat);
        console.log("Lng: ".blue, lugSelec.lng);
        console.log("Temperatura: ".blue, clima.temp);
        console.log("Maxima: ".blue, clima.max);
        console.log("Minima: ".blue, clima.min);
        console.log("Descripcion del clima: ".blue, clima.desc);
        break;

      case 2:
        busquedas.historialCapitalizado.forEach((lugar,i)=>{
          console.log(`${`${i+1}`.green}  ${lugar}`,);
        })
      break;
    }

    await pausa();
    console.clear();
  } while (menu !== 0);
};

main();
