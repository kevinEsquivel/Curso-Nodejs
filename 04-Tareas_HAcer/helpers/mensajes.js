require('colors');
console.clear();
const mostrarMenu = () =>{
    return new Promise(resolve =>{
        console.log('================================='.green);
        console.log('     Seleccione una opcion       '.green);
        console.log('=================================\n'.green);
    
        console.log(`${'1.'.blue} Crear tarea`);
        console.log(`${'2.'.blue} Listar tareas`);
        console.log(`${'3.'.blue} Listar tareas completadas`);
        console.log(`${'4.'.blue} Listar tareas pendientes`);
        console.log(`${'5.'.blue} Completar tarea(s)`);
        console.log(`${'6.'.blue} Borrar tarea`);
        console.log(`${'0.'.blue} Salir\n`);
    
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readline.question('Seleccione una opcion: '/* la pregunta que se hara */,(opt)=>{//*el call back en donde se cargará la respuesta
            
            readline.close();
            resolve(opt);
        })
    })
    

}
const pause = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input:process.stdin,
            output:process.stdout
        });
    
        readline.question(`\nPresione ${'Enter'.red} para continuar\n`/* la pregunta que se hara */,(opt)=>{//*el call back en donde se cargará la respuesta
            
            readline.close();
            resolve();
        })
    });
}
module.exports = {
    mostrarMenu,
    pause
};