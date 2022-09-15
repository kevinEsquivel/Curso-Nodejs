const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categoriasController");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarId } = require("../middlewares/validar-id");
const { validarjwt } = require("../middlewares/validar-jwt");
const router = Router();

//obtener todas las categorias- public
router.get("/", obtenerCategorias);

//obtener una categoria por id -publico
//!midelwers personalizado existeCategoria check('id').custom(exiteCategoria)
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(validarId),
    validarCampos,
  ],
  obtenerCategoria
);

//crear nueva categoria --privado con cualquier rol- post
router.post(
  "/",
  [
    validarjwt,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//put - actualizar un registro por :id
router.put(
  "/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(validarId),
    validarCampos,
  ],  actualizarCategoria ); 
//Delete una cateegoria - si Rol=admin
router.delete("/:id",[
    check("id", "No es un id de mongo").isMongoId(),
    check("id").custom(validarId),
    validarCampos,
] ,borrarCategoria);
module.exports = router;
