const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearProducto,
  mostrarProductos,
  mostrarUnProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productosController");

const { validarCampos } = require("../middlewares/validar-campos");
const { validarId, validarProducto_id } = require("../middlewares/validar-id");
const { validarjwt } = require("../middlewares/validar-jwt");

const router = Router();

//obtener todas las productos- public
router.get("/", mostrarProductos);

//obtener una producto por id -publico
//!midelwers personalizado existeproducto check('id').custom(exiteproducto)
router.get(
  "/:id",
  [check("id", "El id no es un id de mongo").isMongoId(), validarCampos],
  mostrarUnProducto
);

//crear nuevo producto --privado con cualquier rol- post
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("id_usuario", "El id_usuario no es un id de mongo").isMongoId(),
    check("id_categoria", "La id_categoria no es un id de mongo").isMongoId(),
    validarCampos,
  ],
  crearProducto
);

//put - actualizar un producto por :id
router.put("/:id",[
    check('id','El id no es de mongo').isMongoId(),
    check("id_usuario", "El id_usuario no es un id de mongo").isMongoId(),
    check('id').custom(validarProducto_id),
    validarCampos
],actualizarProducto);

//Delete una producto - si Rol=admin
router.delete("/:id",[
    check('id','El id no es de mongo').isMongoId(),
    check('id_usuario','el id_usuario no es de mongo').isMongoId(),
    check('id').custom(validarProducto_id),
    validarCampos
],borrarProducto);
module.exports = router;
