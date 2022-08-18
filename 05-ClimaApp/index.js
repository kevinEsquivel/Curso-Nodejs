require('dotenv').config()

const { leerInput, inquirerMenu, pausa } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");



const main = async () => {
  console.clear();
  let menu;
  const busquedas = new Busquedas();
  do {
    menu = await inquirerMenu();

    switch (menu){
        case 1:
            //mosrar mensaje
            const lugar = await leerInput('Ciudad a buscar: ');
            await busquedas.ciudad(lugar);
            //buscar ciudad
            //seleccionar ciudad

            //clima de la ciudad

            //mostrar resultados
            console.log('\n Informacion de la cudada\n'.green);
            console.log('Ciudad: '.blue);
            console.log('Lat: '.blue);
            console.log('Lng: '.blue);
            console.log('Temperatura Maxima: '.blue);
            console.log('Temperatura Minima: '.blue);
            break;
    }

    await pausa();
  } while (menu !== 0);
};

main();
