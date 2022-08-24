const { response,request  } = require("express");
//* esto es para cuando tengo varios parametros que son distintos y no son obligatorios

const userGet = (req=request, res=response) => {//esto es redundante pero es para que salga el autocopletado
  const parametrosOp = req.query;
  res.json({
    msg: "get API - controlador",
    parametrosOp
  });
};

const userPut = (req, res=response) => {
  const idParams = req.params.idParams;//recupero el valor del url el id
  res.json({
    msg: "put API - controlador",
    parametros:idParams
  });
};
const userPost = (req, res=response) => {
  //como extraeren body
  const {nombre,edad} = req.body;
  res.json({
    msg: "post API - controlador",
    nombre,
    edad
  });
};
const userDelete = (req, res=response) => {
  res.json({
    msg: "delete API - controlador",
  });
};
module.exports = {
  userGet,
  userPut,
  userPost,
  userDelete,
};
