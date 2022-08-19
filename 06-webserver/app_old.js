const http = require('http');


http.createServer( (req,res) =>{ //request- lo que se solicita
                                //response lo que se responde a el server

    //res.setHeader('Content-Disposition', 'attachment; filename="lista.csv"');//le digo que se va a descargar un archivo con ese nombre
    //res.writeHead(200,{'Content-Type': 'application/csv'}); //es el tipo de contenido de la pagina                        
    res.write('hola mundo');
    res.end()

}).listen( 8080 )
console.log('escuchando el puerto 8080');