var express = require('express');
var router = express.Router();
var categoria = require('../models/categorias');
var mongoose = require('mongoose');

router.get('/', (req, res) => {
    categoria.find(
        {},
        {
            nombreCategoria: true,
            "empresas._id":true,
        }
    )
    .then((result) => {
        res.send(result);
        res.end();
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
});

router.get('/:id', (req, res) => {
    categoria.find(
        {
            _id: req.params.id
        }
    )
    .then((result) => {
        res.send(result[0]);
        res.end();
    })
    .catch((error) => {
        res.send(error);
        res.end();
    });
});

router.post('/add', function (req, res){
    let nuevaCategoria ={
        nombreCategoria:req.body.nombreCategoria,
        descripcion:req.body.descripcion,
        icono:req.body.icono,
        color:req.body.color,
        empresas: []
    };
    categoria.push(nuevaCategoria);
    res.send({codigoResultado:1,mensaje:'Registro guardado', categoriaGuardada: nuevaCategoria});
});

module.exports = router;