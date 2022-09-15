const { response } = require("express");

const { ObjectId } = require("mongoose").Types;
const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["usuarios", "comida", "producto"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);
  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      resultado: usuario ? [usuario] : [],
    });
  }

  const expresionReglar = new RegExp(termino, 'i')//omite las mayusculas

  let usuario = await Usuario.find({//*se puede suar con el coutn
    $or: [{ nombre: expresionReglar },{ correo: expresionReglar }], //!PAra poder usar el or 
    $and: [{ estado:true}]
  });
  res.json({ 
    resultado: usuario,
});
};

const buscar = (req = request, res = response) => {
  let { termino, coleccion } = req.params;

  if (!coleccionesPermitidas.includes(coleccion)) {
    return res.json({
      msg: "La coleccion no esta permitida",
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "comida":
      break;
    case "producto":
      break;
    default:
      res.json({
        msg: "Default message",
      });
  }
};
module.exports = {
  buscar,
};
