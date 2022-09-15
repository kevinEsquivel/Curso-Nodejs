//*REQUIRES DE LOS PAQUETES
const { response, request } = require("express");
const bcrypt = require("bcryptjs"); //!para encriptar la contraseña

//**REQUIRES DE ANRCHIVOS CREADOS */
const Usuario = require("../models/usuario");

//* esto es para cuando tengo varios parametros que son distintos y no son obligatorios

const userGet = async (req = request, res = response) => {
  //esto es redundante pero es para que salga el autocopletado
  //const parametrosOp = req.query;
  const { limite = 15, desde = 0 } = req.query;
  /* //TODO----ESTO ES LO MISMO QUE LO DE PROMISE.ALL PERO ESO TARDA MENOS TIEMPO, CASI LA MITAD DE LO QUE TARDA ESTO

  const usuarios = await Usuario.find({ estado: true }) //!solamente los que tengan estado true buscaran
    .skip(Number(desde))
    .limit(Number(limite)); //esto es para saber cuantoss registros mostrar,Number cambiar el arreglo a numero

    const totalDocuments = await Usuario.countDocuments({ estado: true }); //!solamente los que tengan estado true contarán; 
  */

  const [
    /* El primero es el total*/ total,
    /**El segundo son los usuarios */ usuarios,
  ] = await Promise.all([
    //*como es un arreglo se desestructura el arreglo
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }) //!solamente los que tengan estado true buscaran
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({ total, usuarios });
};

const userPut = async (req = request, res = response) => {
  const { id } = req.params; //recupero el valor del url el id
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos

  if (password) {
    //*ENCRIPTAR LA CONTRASEÑA
    const salt = bcrypt.genSaltSync(10); //?son los saltos de encriptacion entre mas grande mas dificil de decifrar
    resto.password = bcrypt.hashSync(password, salt); //? es para generar el hash que se asociara a la contraseña y se guardara con ella
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto); //*1param, el id a buscar, 1param lo que se actualizara

  res.json({ usuario });
};

const userPost = async (req, res = response) => {
  //como extraeren body
  const { nombre, password, correo, rol } = req.body;
  const usuario = new Usuario({ nombre, password, correo, rol }); //

  //validacion de si exste el email

  //ENCRIPTAR LA CONTRASEÑA
  const salt = bcrypt.genSaltSync(10); //?son los saltos de encriptacion entre mas grande mas dificil de decifrar
  usuario.password = bcrypt.hashSync(password, salt); //? es para generar el hash que se asociara a la contraseña y se guardara con ella

  await usuario.save(); //esto es para guardar en bd

  res.json({
    usuario,
  });
};
const userDelete = async(req = request, res = response) => {
  const { id } = req.params;
  
  //!esto viene desde Validar-jwt
  const uid = req.uid;

  //*Borrar fisicamente el documento
  //const usuario= await Usuario.findByIdAndDelete(id); //!ESTO NO SE HACE, NADA SE BORRA DE UNA BASE DE DATOS
  const usuario = await Usuario.findByIdAndUpdate(id,{estado:false}); //*el segundo elemento cambia el estado a false de ese id
  res.json({
    usuario
  });
};
module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
};
