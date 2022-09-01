const Role = require("../models/role");
const Usuario = require("../models/usuario");
const esRolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`rol ${rol} NO permitido`);
  }
};

const emailValidation = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo ${correo} ya esta registrado ${existeEmail}`);
  }
};

const existeId = async (id) => {
  const idEncontrado = await Usuario.findById(id);
  if (!idEncontrado) {
    throw new Error(`El id ${id} no esta registrado. `);
  }
};

module.exports = {
  esRolValido,
  emailValidation,
  existeId,
};
