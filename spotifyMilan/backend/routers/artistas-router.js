var express = require('express');
var router = express.Router();

// Listar artistas
router.get('/',(req, res) => {
    res.send('Router for artists');
    res.end();
});

// Artistas
router.get('/:id', (req, res) => {
    res.send(`Artista ${req.params.id}`);
    res.end();
});

// Obtener albumes y canciones
router.get('/:id/albumes', (req, res) => {
    res.send(`Album del artista ${req.params.id}`);
    res.end();
});

module.exports = router;