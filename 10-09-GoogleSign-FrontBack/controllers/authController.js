const { response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require("../models/usuario");
const { generarJWT } = require('../helpers/generar_JWT');


const login = async(req,res = response) => {

    const { correo, password } = req.body;
    try {
         
        //verificar si el email existe
        const EncontrarUsuario = await Usuario.findOne({correo})
        if(!EncontrarUsuario) {
            return res.status(404).send({
                mesg : "Usuario / Contraseña incorrecto-correo"
            })
        }
        //verificar si el usuario esta activo
        if(EncontrarUsuario.estado===false){
            return res.status(404).send({   
                mesg : "Usuario no activo"
            })
        }

        //verificar la contraseña
        const ValidarContr =  bcryptjs.compareSync(password, EncontrarUsuario.password)
        if(!ValidarContr) {
            return res.status(404).send({
                mesg : "Usuario / Contraseña incorrecto-passwordValidacion"
            })
        }

        //generar el JsonWebToken pJWT
        const token = await generarJWT(EncontrarUsuario.id)

        res.json({
          EncontrarUsuario,
          token
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Hable con el administrador"
            
        })
    }

}

module.exports ={
    login,
}