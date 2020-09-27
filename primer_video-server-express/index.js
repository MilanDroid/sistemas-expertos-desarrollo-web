var express = require('express');
var app = express();

app.use(express.static('public'));

app.listen(4300, () => {
    console.log('Server up');
});