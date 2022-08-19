const express = require('express')
const app = express()
const path = require('path')//es elmodulo de path

const port = 8080

//para poder agregar el html a la ruta
//!siempre buscara primera mente el archivo index.js si no se encuentra, dara la ruta *
//?path te permite trabajar con archivos de windos, JOIN es para unir, __DIRNAME->nombre del directorio, y por ultimo el public es la carpeta de los archivos principales
app.use(express.static(path.join(__dirname, 'public'))); 
//esto es para cuando es contenido estatico

//la carpeta  public tiene ventaja sobre las rutas

app.get('/', (req, res) => {
  res.send('Hello  / kevin')
})
app.get('/generic', (req, res) => {
    res.sendFile(__dirname+'/public/generic.html'); 
})
app.get('/elements', (req, res) => {
    res.sendFile(__dirname+'/public/elements.html'); 
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