const { request, response } = require("express");

const {Categoria, Producto} = require("../models");

const validarId = async (id) => {
  const categoria = await Categoria.findById(id);
  if (!categoria) {
    throw new Error("id no pertenece a alguna categoria" );
  }
};
const validarProducto_id = async (id) => {
  let producto = await Producto.findById(id);
  if (!producto) {
    throw new Error("id no pertenece a algun producto" );
  }
};

module.exports = {
  validarId,
  validarProducto_id
};
