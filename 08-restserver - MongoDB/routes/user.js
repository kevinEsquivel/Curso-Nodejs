

const { Router } = require("express");
const { check } = require("express-validator");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/UserController");
const router = Router();

const { 
  esRolValido,
  emailValidation,
  existeId } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");


//esta configurado en serverjs en la funcion de rutas

router.get("/", userGet); //estoy llamando a la referenia del archivo
router.put('/:id', [
  check('id','No es un id valido de Mongo').isMongoId(),
  check('id').custom(existeId),
  check('rol').custom(esRolValido), // es lo mismo que (rol) =>esRolValido(rol)
  validarCampos
],userPut);
router.post("/",[
  check('nombre','El Nombre es obligatorio').not().isEmpty(),//no tiene que estar vacio
  check('password','El password edebe ser de mas de 6 letras').isLength({min:6}),//no tiene que estar vacio
  check('correo','El correo no est con la sintaxis correcta').isEmail(),//esta crando los errores que los midelwers pueden hacerse
  //check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),//no tiene que estar vacio
  //evaluar el campo de rol
  check('rol').custom((rol) =>esRolValido(rol)), //esto se pued eimplificar
  check('correo').custom((correo) =>emailValidation(correo)), //estoy haciendo una validacion custor
  //!cuando el unico argumento 'rol' es el mismo que el de la funcion se puede simplificar con esRolValido
  //*middelware CREADA POR MI
  validarCampos

], userPost);
router.delete("/:id",[
  check('id','No es un id valido de Mongo').isMongoId(),
  check('id').custom(existeId),
  validarCampos
], userDelete);
module.exports = router;
