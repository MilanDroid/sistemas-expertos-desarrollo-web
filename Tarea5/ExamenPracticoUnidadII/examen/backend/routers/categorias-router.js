var express = require('express');
var router = express.Router();
var categoria = require('../models/categorias');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    categoria.find()
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