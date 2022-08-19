const express = require('express');
const app = express();

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})
app.get('/elements.html', (req, res) => {
    res.sendFile(__dirname + '/elements.html');
})
app.get('/generic.html', (req, res) => {
    res.sendFile(__dirname + '/generic.html');
})
app.listen(8080);