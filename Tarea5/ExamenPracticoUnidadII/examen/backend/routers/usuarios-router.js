var express = require('express');
var router = express.Router();
var usuario = require('../models/usuarios');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    usuario.find()
    .then((result) => {
        res.send(result);
        res.end();
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
});

module.exports = router;