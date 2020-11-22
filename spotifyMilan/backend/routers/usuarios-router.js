var express = require('express');
var router = express.Router();

router.get('/',(req, res) => {
    res.send('Router for users');
    res.end();
});

// Artistas
router.get('/:id', (req, res) => {
    res.send(`Usuario ${req.params.id}`);
    res.end();
});

// Obtener playlists
router.get('/:id/playlist', (req, res) => {
    res.send(`Playlist del usuario ${req.params.id}`);
    res.end();
});

// Obtener playlists
router.get('/:idUsuario/playlist/:idPlaylist', (req, res) => {
    res.send(`Playlist ${req.params.idPlaylist} del usuario ${req.params.idUsuario}`);
    res.end();
});

module.exports = router;