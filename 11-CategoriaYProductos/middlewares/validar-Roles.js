const { request, response } = require("express");
const { Usuario } = require("../models");

const tieneRol = (...roles) => {
  //*los ... son un operador
  return (req = request, res = response, next) => {
    if (!req.usuario) {
      return res.status(500).send("SE quiere verificar sin validar token");
    }

    if (!roles.includes(req.usuario.rol)) {
      return res.status(401).send(`Se requiere alguno de estos roles ${roles}`);
    }

    next();
  };
};

module.exports = {
  tieneRol,
};
