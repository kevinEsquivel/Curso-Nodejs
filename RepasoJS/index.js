/* const {suma}= require('./suma')

console.log("suma 3 + 2 resultado: ",suma(2,3));

//variables globales
globalThis.miValor=165;
console.log(global.miValor); */
/* 
const operaciones=require('./suma.js');//acceso a el archivo suma, tambien se pueden imprtar json
console.log(operaciones);
const users=require('./users.json');//
console.log(users); */
//acabamos de instalar  el paquete jsonwebtoken
//const jsonwebtoken =require('jsonwebtoken');

//!servidor http
/* console.clear();//limpiar la consola cada vez que se ejecute
import {createServer} from 'http';//libreria nativa de http
const httpServer=createServer((req,res)=>{
    console.log("peticion recibida");

    res.end("recibido Colega");
});//creando el servidor
httpServer.listen(3000);//escucha solucitudes en el puerto que yo seleccione
 */

/* const html = `
<h1>hola</h1>
<p>Mundo</p>`;
console.log(html); */


//! DESESTRUCTURACION  DE OBJETOS
const deadpool ={
    nombre:'Wade',
    apellido:'Winston',
    poder:'regeneracion',
    getNombre(){
        return `${this.nombre} ${this.apellido}`
    }

}


/* const nombre    = deadpool.nombre
const apellido  = deadpool.apellido
const poder     = deadpool.poder */
 //?ejemplo de desestructuracion
 /* const {nombre,apellido,poder,edad=0} = deadpool;
console.log(nombre,apellido,poder,edad); */


/* function imprimeHeroe({nombre,apellido,poder,edad=0}){
    console.log(nombre,apellido,poder,edad); 
}
imprimeHeroe(deadpool);
//? desestructuracion en arreglos
const heroes =['deadpool','superman','batman'];
const [,,h3]=heroes;// solamente selecciono batman
console.log(h3); //imprime batman */


//! FUNCIONES FLECHA
/* const sumar = (a,b) => {return a+b;}
const restar = (a,b) => a-b;
console.log(sumar(5,10));
console.log(restar(10,5));
 */

//! CALLBACKS

/* setTimeout( ()=>{
    console.log('hole amundo');
},1000 );//es una funcion que se ba a ejecutar despues de un tiempo
 */

/* const getUsuarioById = (id,callback) => {
    const user ={
        id,
        nombre:'Kevin'
    }
    setTimeout(()=>{
        callback(user);
    },1500)
}

getUsuarioById(10,(usuario) => {//este es el callback, y el parametro puede ser lo que yo quisiera
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
}); */
//**IMPORTANTE*/
//TODO: 
