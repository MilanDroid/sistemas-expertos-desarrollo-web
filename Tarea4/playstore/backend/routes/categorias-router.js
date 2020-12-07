var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var categorias = require('../models/categorias');

router.get('/', (req, res) => {
    categorias.find().then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

router.get('/:id', (req, res) => {
    categorias.find({_id: req.params.id}).then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

router.get('/:id/app/:appId', (req, res) => {
    categorias.find({
        _id: req.params.id,
        "aplicaciones._id": mongoose.Types.ObjectId(req.params.appId)
    },
    {"aplicaciones.$": true})
    .then(result => {
        res.send(result[0]);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

router.post('/:id/app/:appId/comentarios', (req, res) => {
    categorias.update({
        _id: req.params.id,
        "aplicaciones._id": mongoose.Types.ObjectId(req.params.appId)
    },{
        $push: {
            "aplicaciones.$.comentarios" : {
                _id: mongoose.Types.ObjectId(),
                comentario: req.body.comentario,
                fecha: new Date(),
                calificacion: 5,
                usuario: "Yo"
            }
        }
    })
    .then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

router.post('/:id/app/add', (req, res) => {
    categorias.updateOne({
        _id: req.params.id
    },{
        $push: {
            "aplicaciones" : {
                _id: mongoose.Types.ObjectId(),
                nombre: req.body.nombre,
                icono: req.body.icono,
                descripcion: req.body.descripcion,
                desarrollador: req.body.desarrollador,
                precio: req.body.precio,
                descargas: req.body.descargas,
                calificacion: req.body.calificacion,
                instalada: false,
                imagenes: [
                    "img/app-screenshots/1.webp",
                    "img/app-screenshots/2.webp",
                    "img/app-screenshots/3.webp"
                ],
                comentarios: []
            }
        }
    })
    .then(result => {
        res.send(result);
        res.end();
    }).catch(error => {
        res.send(error);
        res.end();
    });
});

module.exports = router;