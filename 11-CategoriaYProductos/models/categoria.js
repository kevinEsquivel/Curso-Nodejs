const {Schema,model} = require('mongoose')
const CategoriaSchema = Schema({ //f2 para renombre
    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado:{
        type:Boolean,
        default: true,
        required:true
    },
    usuario:{
        type:Schema.Types.ObjectId, //*Esto es para hacer una referencia al tipo que es
        ref:'Usuario', //se guardara un de tipo Usuario
        required:true
    }
})

module.exports= model('Categoria',CategoriaSchema)