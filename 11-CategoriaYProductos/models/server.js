const express = require("express");
const cors = require("cors");
const { dbConection } = require("../database/config");

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT //
    this.paths = {
      usuarios:   '/api/user',
      auth:       '/api/auth',
      buscar:       '/api/buscar',
      categorias: '/api/categorias',
      productos: '/api/productos',
    };
    
    
    
    //!conectandome a la BD
    this.contectarDB();
    
    //middlewares funcion que siempre se ejecutara cuando se activa el server
    this.middlewares();

    //rutas de la aplicación
    this.routes();
  }

  async contectarDB(){
    await dbConection();
  }
 
  middlewares() {
    //directorio publico que se accedera con la ruta /
    this.app.use(express.static('public'))
    this.app.use(cors())
    //Lecura y parseo del body en postman
    this.app.use(express.json());// intentara serealizar la informacion a un json
  }
   
  routes() {

    this.app.use(this.paths.usuarios, require('../routes/user'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.buscar, require('../routes/buscar'));
    this.app.use(this.paths.categorias, require('../routes/categorias'));
    this.app.use(this.paths.productos, require('../routes/productosRutas'));
    
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("servidor en puerto ", this.port);
    }); //port 8080
  }
}

module.exports = server;
