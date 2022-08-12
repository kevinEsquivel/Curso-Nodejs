const Tarea = require("./tarea");
const archivo = "./db/data.json";
/*
 *_listado:
 *{ 'uuid_123456789':{ id:12,desc:'asdf',completadoEn:123123 } }
 */
class Tareas {
  _listado = {};
  get listadoArr() {
    const listado = [];
    Object.keys(
      this._listado /* Retorna todas las llaves del arreglo */
    ).forEach((key) => {
      const tarea = this._listado[key]; //* extraigo la tarea con la key selecionada
      listado.push(tarea); //* lo agrego al arreglo
    });

    return listado;
  }
  constructor() {
    this._listado = {};
  }

  cargarTareasFromArray(tareas) {
    tareas.forEach((tareas) => {
      this._listado[tareas.id] = tareas;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto() {
    let v = false;
    console.log();
    this.listadoArr.forEach((tarea, i /* ESTO ES EL INDICE DEL FOR*/) => {
      // el segundo argumento de un forEach es el indice
      if (tarea.completadoEn === null) v = true;
      console.log(
        `${`${i + 1}.- `.blue}  ${tarea.desc} -- ${
          v ? `${"Pendiente".red}` : `${"Completada".green}`
        }`
      );
      i++;
    });
    //1.Azul: nombre de la tarea -- completada:verde,PEndiente:Rojo
  }
  listarPendientesCompletadas(comp = true) {
    //true->completadas
    console.log();
    this.listadoArr.forEach((tarea, i /* ESTO ES EL INDICE DEL FOR*/) => {
      // el segundo argumento de un forEach es el indice
      if (comp && tarea.completadoEn != null) {
        console.log(
          `${`${i + 1}.- `.blue}  ${tarea.desc} -- ${"Completada".green} -- ${tarea.completadoEn}`
        );
      }
      //False->pendientes
      if (!comp && tarea.completadoEn == null) {
        console.log(
          `${`${i + 1}.- `.blue}  ${tarea.desc} -- ${"pendiente".red} `
        );
      }
    });
  }

  borrarTarea(id=''){
    if(this._listado[id]){
      delete this._listado[id];
    }
  }

  toggleCompletadas(ids=[]){
    ids.forEach(id =>{
      const tarea = this._listado[id];//extraigo la tarea
      if(!tarea.completadoEn){
        tarea.completadoEn = new Date().toISOString(); //? pa que?
      }
    });

    this.listadoArr.forEach(tarea =>{
      if(!ids.includes(tarea.id)){//* Preguntar si no exste en ids  el id de la tarea
      this._listado[tarea.id].completadoEn=null;// la tarea con el id correspondiente se vuelve pendiente 
      }   
    })

  }
}
module.exports = Tareas;
