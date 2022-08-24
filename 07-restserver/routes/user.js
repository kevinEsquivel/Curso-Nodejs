const { Router } = require("express");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
} = require("../controllers/UserController");
const router = Router();

//esta configurado en serverjs en la funcion de rutas

router.get("/", userGet); //estoy llamando a la referenia del archivo
router.put('/:idParams', userPut);
router.post("/", userPost);
router.delete("/", userDelete);
module.exports = router;
