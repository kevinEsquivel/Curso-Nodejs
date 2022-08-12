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

const getEmpleado = (id,callback/*Se le tiene que informar que es un callback*/) => {
    const empleado = empleados.find( e => e.id===id )
    if(empleado) callback (null,empleado)//!el null para el error
    else callback (`Empleado con id : ${id} no existe`)
    
}

getEmpleado(1,(err,empleado) => {//?estoy mandando el 5 y resiviendo el empleado con el id 5
    if(err){
        console.log('ERROR: ');
        return console.log(err);
    }
    console.log('empleado existe');
    console.log(empleado.nombre);   //?para despues imprimirlo. CALLBACK
})


//*Parte salarios
const getSalario = (id,callback) =>{
    // buscaras un id en el arreglo salarios que sea igual al id que se ingreso
    const sal=salarios.find(e => e.id==id)?.salario; //! si esto regresa un valor que esta en el objeto salario entonces 
                                                    //!no hay problema, pero si regresa un undefined entonces no tendra la propiedad salario
                                                    //! para preguntar si EXISTE o no esta propiedad se agrega el ? 
                                                    //! ANTES .salario DESPUES ?.salario
    if(sal){
        callback(null,sal)
    }else{
        callback(`El usuario con el ${id} no tiene salario `)
    }
}

getSalario(1,(err,salario)=>{
    if(err){
        console.log('ERROR SALARIOS: ');
        return console.log(err);
    }
    console.log('Salario existe');
    console.log(salario);//YA SE TIENE EL SALARIO PORQUE SE PUSO EL ? ARRIBA
})