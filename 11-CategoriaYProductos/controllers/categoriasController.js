const { request } = require("express");
const { Categoria, Usuario } = require("../models");

//obtenerCategorias -paginado - total -populate?mongoose
const obtenerCategorias = async (req = request, res = response) => {
  try {
    const { limite = 15, desde = 0 } = req.query;

    //!Si esto lo hago una promesa ura menos tiempo
    let categoria = await Categoria.find({ estado: true })
      //*se esta seleciconando solo el nombre si se quita mostrara toda el informacion
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite));
    let Total = await Categoria.countDocuments({ estado: true });

    res.json({
      Total,
      categorias_registradas: categoria,
    });
  } catch (error) {
    console.log(error);
  }
};
//obtenerCategoria -id populate{}
const obtenerCategoria = async (req = request, res = response) => {
  let id = req.params.id;
  let categoria = await Categoria.findOne({ id }).populate("usuario");
  if(categoria.estado!== true){
    return res.json({
        msg:'Esta categoria no exite'
    })
  }
  res.json(categoria);
};
const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({ nombre });
  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  //Generar la data aguardar
  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //guardar en db
  await categoria.save();

  res.status(201).json(categoria);
};

//actualizarCategoria - cambiar nombre
const actualizarCategoria = async (req = request, res = response) => {
    
    let {id} = req.params;
    let {nombre} = req.body;
    const categoriaActualizada =  await Categoria.findByIdAndUpdate(id,{nombre}/* ,{new:true} */);//*Es  para obtener el objeto despues d ela actualización

    res.json({
        nombre,
        categoriaActualizada
    })
};
//borrarCategoria - Cambiar estado false
const borrarCategoria = async (req = request, res = response) => {
    let {id} = req.params;
    let {_id} = req.headers;
    
    const usuarioLogeado = await Usuario.findById(_id);
    if(usuarioLogeado.rol!== 'ADMIN_ROLE'){
        return res.json({
            msg:'No se cuenta con el rol para realizar esta modificacion'
        })
    }
    let categoria = await Categoria.findByIdAndUpdate( id ,{estado:false});
    res.json({
        usuarioLogeado,
        categoria
    })
    /* if(catBorrada.usuario.rol!== 'ADMIN_ROLE'){
        res.status(404).json({
            msg:'El usuario no cuenta con el rol Permitido-'
        })
    } */

}

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria
};
