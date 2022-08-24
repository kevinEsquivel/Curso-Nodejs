const express = require("express");
const cors = require("cors");

class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT //
    this.userPath = '/api/user'

    //middlewares funcion que siempre se ejecutara cuando se activa el server
    this.middlewares();

    //rutas de la aplicación
    this.routes();
  }
 
  middlewares() {
    //directorio publico que se accedera con la ruta /
    this.app.use(express.static('public'))
    this.app.use(cors())
    //Lecura y parseo del body en postman
    this.app.use(express.json());// intentara serealizar la informacion a un json
  }
   
  routes() {

    this.app.use(this.userPath,require('../routes/user'));
    
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("servidor en puerto ", this.port);
    }); //port 8080
  }
}

module.exports = server;
