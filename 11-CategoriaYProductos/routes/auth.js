const { Router } = require("express");
const { check } = require("express-validator");
const { login, googlesing } = require("../controllers/authController");
const { validarCampos } = require("../middlewares/validar-campos");

const router = Router();
//esta configurado en serverjs en la funcion de rutas

router.post("/login", [
    check('correo','Correo es Obligatorio').isEmail(),
    check('password','La constraseña es obligatoria').not().isEmpty(),
    validarCampos
],login);
router.post("/google", [
    check('id_token','id_token es Obligatorio').not().isEmpty(),
    validarCampos
],googlesing); 

module.exports = router;