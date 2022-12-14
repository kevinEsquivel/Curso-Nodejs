const {Schema,model} = require('mongoose')
const ProductoSchema = Schema({ //f2 para renombre
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
    },
    precio:{
        type: Number,
        default:0
    },
    categoria:{
        type:Schema.Types.ObjectId,
        ref: 'Categoria',
        required:true
    },
    descripcion:{type: String},
    disponible:{type: Boolean,default: true},

})
ProductoSchema.methods.toJSON = function(){
    const {_v,estado,...data} = this.toObject();
    return data;
}
module.exports= model('Producto',ProductoSchema)