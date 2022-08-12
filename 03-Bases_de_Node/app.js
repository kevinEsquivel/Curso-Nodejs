

const { crearArchivo }=require('./helpers/multiplicar')
console.clear();
const argv = require('./config/yargs');
require('colors');


//const base =3;
crearArchivo(argv.b,argv.l,argv.h)
.then(nombre=> console.log(nombre.green))
.catch(err=> console.log(err.red));

