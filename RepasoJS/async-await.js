const empleados=[
    {
        id:1,
        nombre:'fernando'
    },
    {
        id:2,
        nombre:'linda'
    },
    {
        id:3,
        nombre:'Karen'
    }
]
const salarios=[
    {
        id:1,
        salario:1000
    },
    {
        id:2,
        salario:1500
    }
]

//TODO PROMESAS
const getEmpleado = (id) => {
    //? creacion de promesas
    return new Promise((resolve, reject) => {
        const empleado = empleados.find( e => e.id===id )?.nombre   //! si esto regresa un valor que esta en el objeto salario entonces 
                                                                //!no hay problema, pero si regresa un undefined entonces no tendra la propiedad salario
                                                                //! para preguntar si EXISTE o no esta propiedad se agrega el ? 
                                                                //! ANTES .salario DESPUES ?.salario
        // IF simploficado
        empleado?resolve(empleado):reject(`no existe empleado con el id:${id} `);
        
    });
    
}

//* Funcion de Salario
//! esto es la promesa
const getSalario = (id) => {

    return new Promise((resolve,reject) => {
        const sal = salarios.find(salario => salario.id === id)?.salario;
        sal?resolve(sal):reject(`El usuario con el id ${id} no cuenta con un salario`);
    });

}

//*await es esperar la respuesta de la promesa y despues continuar con el codigo
//*await solo es valido en una funcion async
const getInfoUsuario = async( id ) =>{//se transofrma la funcion para que regrese una promesa
    try{
    const empleado = await getEmpleado(id)
    const salario = await getSalario(id)
    return `El empleado: ${empleado} tiene un salario de: ${salario}`;
    }catch(e){ 
        //return e //ESTO SALIENDO CORRECTAMENTE POR EL RETURNE POR ESO USA EL msg
        throw e   //esto dice que es un error Y por eso es que si se corre el catch de abajo
    }
}

const id =3;
 
getInfoUsuario(id)
    .then(msg => {
        console.log('TODO BIEN');
        console.log(msg)
    })
    .catch(err => {
        console.log('TODO MAL');
        console.error(err)
    });