const { request, response } = require('express');
const jwt = require('jsonwebtoken');


const Usuario = require('../models/usuario');

const validarjwt = async (req=request,res=response,next) =>{
    const token = req.header('token')
    console.log(token);
    if(!token){
        return res.status(401).send('Unauthorized-No token');
    }

    try {
    const {uid}= jwt.verify(token,process.env.SECRETORPRIVATEKEY)
    req.uid = uid;

    //leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid)

    //?Si el usuario es undefined 
    if(!usuario){
        return res.status(401).send('Unauthorized-No exists usuario');
    }

    //* Detectar si es usuario Admin
    /* if(usuario.rol!== 'ADMIN_ROLE'){
        return res.status(401).send('Unauthorized-No se tiene el rol ADMIN');
    } */

    //Si un usuario esta borrado no puede hacer nada
    if(!usuario.estado){
        return res.status(401).send('El Usuario fue borrado');
    }
    req.usuario=usuario
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send('Server error-Invalid-token');
    }

}

module.exports ={
    validarjwt,
}