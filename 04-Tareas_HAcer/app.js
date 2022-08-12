require("colors");

const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
} = require("./helpers/inquirer");

const Tareas = require("./models/tareas");

//const {mostrarMenu,pause}  = require('./helpers/mensajes');

const main = async () => {
  const tareas = new Tareas();
  let opt = "";

  const tareasDB = leerDB();
  if (tareasDB) {
    //TODO: cargarTareasFromArray
    tareas.cargarTareasFromArray(tareasDB);
  }

  do {
    //opt=await mostrarMenu();//!espera hasta que se tenga una respuesta de mostrarMenu
    console.log("=================================".green);
    console.log("     Seleccione una opcion       ".green);
    console.log("=================================\n".green);

    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        const desc = await leerInput("Descripcion: ");
        tareas.crearTarea(desc);

        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3"://listar tareas completadas
        tareas.listarPendientesCompletadas(true);
        break;
      case "4": //listar tareas pendientes
        tareas.listarPendientesCompletadas(false);
        break;
        case "5"://completados  0 pendiende
          const ids = await mostrarListadoCheckList(tareas.listadoArr);
          tareas.toggleCompletadas(ids)
          break;
      case "6":
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if(id!=='0'){
          const preguntarBorrado = await confirmar("¿Esta seguro?");
          if (preguntarBorrado) {
            tareas.borrarTarea(id);
            console.log(`TAREA BORRADA`);
          } // si preguntado es true entonces se toma el id y se borra
        }
        break;
    }
    guardarDB(tareas.listadoArr);
    await pausa();
    //if(opt!=='0')await pause();//!esto para que se detenga en pausa porque si no se limpia la pantalla y se hace un cilo con lo de mostrarMenu
    console.log({ opt });
    console.clear();
  } while (opt !== "0");
};
main();
