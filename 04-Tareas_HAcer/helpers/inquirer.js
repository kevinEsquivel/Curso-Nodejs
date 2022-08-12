const { red } = require("colors");
const inquirer = require("inquirer");
const { default: Choice } = require("inquirer/lib/objects/choice");
const { validate } = require("uuid");

require("colors");

const preguntas = [
  {
    type: "list",
    name: "opcion",
    message: "¿Que desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".blue} Crear tarea  `,
      },
      {
        value: "2",
        name: `${"2.".blue} Listar tareas   `,
      },
      {
        value: "3",
        name: `${"3.".blue} Listar tareas completadas   `,
      },
      {
        value: "4",
        name: `${"4.".blue} Listar tareas pendientes   `,
      },
      {
        value: "5",
        name: `${"5.".blue} Completar tarea(s)  `,
      },
      {
        value: "6",
        name: `${"6.".blue} Borrar tarea  `,
      },
      {
        value: "0",
        name: `${"0.".blue} Salir\n  `,
      },
    ],
  },
];

const inquirerMenu = async () => {
  const { opcion } = await inquirer.prompt(preguntas);
  return opcion;
};
const respuesta = [
  {
    type: "input",
    name: "res",
    message: `Presione ${"Enter".red} para continuar`,
  },
];
const pausa = async () => {
  const { res } = await inquirer.prompt(respuesta);
  return res;
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message: message, //!esto es igual a dejas solo message
      validate(value) {
        if (value.length === 0) {
          return "Porfvor ingresar un valor";
        }
        return true;
      },
    },
  ];
  const {desc} = await inquirer.prompt(question);
  return desc;
};

//TODO: Listar tareas que quiero borrar ademas de seleeionar y preguntas si esta seguro
const listadoTareasBorrar = async( tareas = [] )=>{
//Map sirve para que por cada tarea de tareas va a retornar el id y lo demas dando 
//arrys por separado, dependiendo de el numero de tareas, si hay 5 tareas de retorna
//en choices 5 arreglos
  const choices = tareas.map((tarea,i) =>{ 
    return{
      value: tarea.id,
      name: `${`${i+1}`.green}  ${tarea.desc}`
    }
  });
  //*Estoy agregando al final lo siguiente
  choices.unshift({
    value:'0',
    name:'0.-'.green+'Cancelar'
  });
  const preguntas=[
    {
      type: 'list',
      name: 'id',
      message:'Borrar',
      choices
    }
  ]
  const { id } = await inquirer.prompt(preguntas);//*el que se seleccione es el que se retorna

  return id
}

const confirmar = async(message) => {
  const pregunta = [
    {
      type: 'confirm',
      name:'ok',
      message: message
    }
  ]
  const { ok } = await inquirer.prompt(pregunta);
  return ok;
}
const mostrarListadoCheckList = async( tareas = [] )=>{
  //Map sirve para que por cada tarea de tareas va a retornar el id y lo demas dando 
  //arrys por separado, dependiendo de el numero de tareas, si hay 5 tareas de retorna
  //en choices 5 arreglos
    const choices = tareas.map((tarea,i) =>{ 
      return{
        value: tarea.id,
        name: `${`${i+1}`.green}  ${tarea.desc}`,
        checked:(tarea.completadoEn)?true:false
      }
    });
    
    const preguntas=[
      {
        type: 'checkbox',
        name: 'ids',//regresa un array con los id seleccionados
        message:'Selecciones',
        choices
      }
    ]
    const { ids } = await inquirer.prompt(preguntas);//*el que se seleccione es el que se retorna
  
    return ids
  }
module.exports = {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckList
};
