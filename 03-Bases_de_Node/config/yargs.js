const argv = require('yargs')
    .option('b',{
        alias: 'base',
        type: 'number',
        describe:'Es la base de la tabla de multiplicar'
    }).option('l',{
        alias: 'listar',
        type: 'boolean',
        default:'false',
        describe:'Muestra la tabla en consola'
    }).options('h',{
        alias: 'hasta',
        type: 'number',
        default:'10',
        describe:'Muestra la tabla hasta el numero que se proporcione'
    })
    .check( (argv,options) =>{
        if(isNaN(argv.b)){
            throw 'La base tiene que ser un numero'
        }
        return true
    })
    .argv;

    module.exports = argv