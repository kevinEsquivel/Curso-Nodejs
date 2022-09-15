const { request, response } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generar_JWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
  const { correo, password } = req.body;
  try {
    //verificar si el email existe
    const EncontrarUsuario = await Usuario.findOne({ correo });
    if (!EncontrarUsuario) {
      return res.status(404).send({
        mesg: "Usuario / Contraseña incorrecto-correo",
      });
    }
    //verificar si el usuario esta activo
    if (EncontrarUsuario.estado === false) {
      return res.status(404).send({
        mesg: "Usuario no activo",
      });
    }

    //verificar la contraseña
    const ValidarContr = bcryptjs.compareSync(
      password,
      EncontrarUsuario.password
    );
    if (!ValidarContr) {
      return res.status(404).send({
        mesg: "Usuario / Contraseña incorrecto-passwordValidacion",
      });
    }

    //generar el JsonWebToken pJWT
    const token = await generarJWT(EncontrarUsuario.id);

    res.json({
      EncontrarUsuario,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};
const googlesing = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { nombre, img, correo } = await googleVerify(id_token);

    let usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      const data = {
        nombre,
        correo,
        password: "XD",
        img,
        rol: "USER_ROLE",
        google: true,
      };

      usuario = new Usuario(data);
      await usuario.save();
    }

    //si el usuario en DB
    if (!usuario.estado) {
      return res.status(401).json({
        msg: "Hable con el administrador",
      });
    }

    //generar el JsonWebToken pJWT
    const token = await generarJWT(usuario.id);
    res.json({
      usuario,
      token,
    });
  } catch (error) {
    //        console.log(error);
    res.status(401).json({
      ok: false,
      msg: "Noo se pudo verificar el token",
    });
  }
};

module.exports = {
  login,
  googlesing,
};
