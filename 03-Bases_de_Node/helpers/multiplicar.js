
const fs = require('fs');
require('colors');
const crearArchivo = async(base = 5,listar,hasta) => {
    try{
        let salida,consola = ""; //las 2 se inicializan en vacio

        for (let i = 1; i <=hasta; i++) {
          salida += `Numero ${base} x ${i} = ${base * i} \n`;
          consola += `Numero ${base} ${'x'.yellow} ${i} ${'='.white} ${base * i} \n`;
        }
        if(listar)console.log(consola);
        fs.writeFileSync(`./salida/tabla_${base}.txt`, salida);
      
        return `archivo tabla_${base}.txt creado`;
    }catch(err){
        throw err;
    }
};

//estoy exportando la funcion crearArchivo
module.exports={
    //crearArchivo:crearArchivo//*asi es redundante tendria que estar as
    crearArchivo
    //o en caso contrario function:crearArchivo//*asi lo que hago es renombrar la funcion

};