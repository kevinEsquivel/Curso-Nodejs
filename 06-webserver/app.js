const express = require('express');
const path = require('path');//es elmodulo de path
const hbs = require('hbs');
require('dotenv').config();


const app = express();

//!!!!!!! COSAS A CAMBIAR AL SUBIR A EL HOST
//* 1.- AGREGAR EL PUERTO A VARIABLES DE ENTORNO
//* 2.- AGREGAR EL SCRIPT DE START EN EL PACKAGE.JSON
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const port = process.env.PORT;

//TODO: requise('hbs')  
//*HANDLEBARS
app.set('view engine', 'hbs');

//!!!!!!!!!!!!!!!!!!!!!!!IMPORTANTICIMO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
hbs.registerPartials(__dirname + '/views/partials');
//para poder agregar el html a la ruta
//!siempre buscara primera mente el archivo index.js si no se encuentra, dara la ruta *
//?path te permite trabajar con archivos de windos
//?JOIN es para unir, __DIRNAME->nombre del directorio,
//?public es la carpeta de los archivos principales
app.use(express.static(path.join(__dirname, 'public'))); 
//esto es para cuando es contenido estatico

//la carpeta  public tiene ventaja sobre las rutas

app.get('/', (req, res) => {
    res.render('home',{ //si eta informacion ira en cada pagina debe pasarse igual en cada pagina
        nombre:'Kevin',
        titulo:'Curso nodeJS Excelente',
        edad:20
    });//*para Handlebars.js, la segunda es para las opciones
  //res.send('Hello  / kevin')
})

//! se quito el generic.html cuanto tambien en los <a> se cambia por estas rutas
app.get('/generic', (req, res) => {
    //res.sendFile(__dirname+'/public/generic.html'); //esto es para cuando son html
    res.render('generic',{
        nombre:'Kevin',
        titulo:'Curso nodeJS Excelente',
        edad:20
    });  //*esto es para hbs
})
app.get('/elements', (req, res) => {
    //res.sendFile(__dirname+'/public/elements.html'); 
    res.render('elements',{
        nombre:'Kevin',
        titulo:'Curso nodeJS Excelente',
        edad:20
    });  //*esto es para hbs
})
app.get('/hola-mundo', (req, res) => {
    res.send('hola mundo en su respectiva ruta')
  })
app.get('*', (req, res) => { //esto es el es comodin pra cuando no encuetra las rutas
    //res.send('404 | page not found');//estp manda este texto a la pagina
    res.sendFile(__dirname+'/public/404.html'); //aqui estoy enviando el archivo de la ruta especificada
  })

//*app.listen(8080) //selecciono el puerto en el que se usa

app.listen(port,() =>{
    console.log(`Example aoo listenint at http://localhost:${port}`);
})