var express = require('express');
var router = express.Router();
var usuario = require('../models/usuarios');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    usuario.find({},{nombre:1,apellido:1})
    .then((result) => {
        res.send(result);
        res.end();
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
});

router.get('/:id/ordenes', (req, res) => {
    usuario.find({_id: req.params.id},{ordenes:1})
    .then((result) => {
        res.send(result[0]);
        res.end();
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
});

module.exports = router;