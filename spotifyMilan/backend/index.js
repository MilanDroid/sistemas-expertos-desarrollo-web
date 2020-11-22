var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var database = require('./modules/database');

var usuariosRouter = require('./routers/usuarios-router');
var artistasRouter = require('./routers/artistas-router');

var app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/usuarios', usuariosRouter);
app.use('/artistas', artistasRouter);

app.listen(8000, () => {
    console.log('Server Up');
});