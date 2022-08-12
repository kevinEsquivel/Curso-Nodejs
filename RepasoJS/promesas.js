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
        empleado
        ?resolve(empleado)
        :reject(`no existe empleado con el id:${id} `);
        
    });
    
}
const id =3;
/* getEmpleado (id)
    .then(empleado=>console.log(empleado))
    .catch(error=>console.log(error)) */


//* Funcion de Salario
//! esto es la promesa
const getSalario = (id) => {
    return new Promise((resolve,reject) => {
        const sal = salarios.find(salario => salario.id === id)?.salario;
        sal?resolve(sal):reject(`El usuario con el id ${id} no cuenta con un salario`);
    });
}

/* getSalario(id)
    .then(salario=>console.log(salario))
    .catch(error=>console.log(error)) */

    //Esto es un promesa en cadena que es muy dificil de comprender 
//?PARTE DIFICIL
/*     getEmpleado(id)
        .then(empleado => {

        getSalario(id)
            .then(salario => {
                console.log(`El empleado: ${empleado} tiene un salario de: ${salario}`);
            })
            .catch(error=>console.log(error))
    })
    .catch(error=>console.log(error))
 */
    //?LO MISMO PERO MAS FACIL
    let nombre;
    getEmpleado(id)
        .then(empleado => {
            nombre=empleado;
            return getSalario(id)
        })
        .then(salario =>console.log(`El empleado: ${nombre} tiene un salario de: ${salario}`))
        .catch(error=>console.log(error))