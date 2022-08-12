
const fs = require('fs');
const archivo = './db/data.json';
const guardarDB = ( data )=>{
    fs.writeFileSync( archivo,JSON.stringify(data)) //comvierte un objeto a su version JSON STRING
};

const leerDB = ()=>{
    if(!fs.existsSync(archivo))//pregunto si eso existe
    {
        return null;
    }
    const info = fs.readFileSync(archivo,{encoding: 'utf8'});// estoy extrayendo la informacion de archivo
    const data= JSON.parse(info); //estoy convirtiendo el texto del json en un arreglo de tareas 
    
    return data;
}

module.exports={
    guardarDB,
    leerDB
}