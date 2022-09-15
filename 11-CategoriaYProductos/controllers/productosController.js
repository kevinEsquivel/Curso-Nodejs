
const { request ,response} = require("express");
const { Producto, Usuario, Categoria } = require("../models");

const mostrarProductos = async (req = request, res = response) => {
  let { limite = 15, desde = 0 } = req.params;

  let total = await Producto.countDocuments({ estado: true });
  let productos = await Producto.find({ estado: true })
    .populate("usuario", "nombre")
    .populate("categoria", "nombre")
    .skip(Number(desde)) //*Buscar todo lo que tenga estado en true
    .limit(Number(limite));
  res.json({
    total,
    productos,
  });
};
const mostrarUnProducto = async (req = request, res = response) => {
  let id = req.params.id;
  let producto = await Producto.findById(id)
                            .populate("usuario", "nombre")
                            .populate("categoria", "nombre");
    if(!producto) return res.json({msg:`El producto no existe`})
    if(!producto.estado) return res.json({msg:`El producto fue borrado`})

  res.json({
    producto
  });
};
const crearProducto = async (req = request, res = response) => {
  const { nombre } = req.body;
  const { id_usuario, id_categoria } = req.headers;

  const u = await Usuario.findById(id_usuario);
  if (!u) {
    return res.status(404).json({ message: "Usuario no valido" });
  }

  const c = await Categoria.findById(id_categoria);
  if (!c) {
    return res.status(404).json({ message: "Categoria no valida" });
  }
  const producto = await Producto.findOne({ nombre });
  if (producto)
    return res
      .status(404)
      .json({ message: `Producto: ${producto.nombre} ya exite` });

  const data = {
    nombre,
    usuario: id_usuario,
    categoria: id_categoria,
  };

  const productoGuardar = new Producto(data);
  await productoGuardar.save();
  res.json({
    productoGuardar,
  });
};
const actualizarProducto = async(req=request, res=response)=>{
    let {id} = req.params;
    let {id_usuario} = req.headers;
    let {nombre} = req.body;

    if(! await Usuario.findById(id_usuario)){
        return res.json({msg : 'Usuario no existe'})
    }
    let producto=await Producto.findByIdAndUpdate(id,{nombre,usuario:id_usuario})
    res.json({producto})
};
const borrarProducto = async (req= request, res = response) => {
    let  {id} = req.params;
    let {id_usuario} = req.headers
    let u = await Usuario.findById(id_usuario);
    if(!u){
        return res.status(404).json({msg:'El usuario no existe'});
    }
    
   if (u.rol !== "ADMIN_ROLE") {
     return res.json({msg:"El usuario no cuenta con los permisos necesarios"});
    } 

    let productoBorrado = await Producto.findByIdAndUpdate(id,{estado:false})
    
    res.json({
      productoBorrado,
    })
}
module.exports = {
  crearProducto,
  mostrarProductos,
  mostrarUnProducto,
  actualizarProducto,
  borrarProducto,
};
