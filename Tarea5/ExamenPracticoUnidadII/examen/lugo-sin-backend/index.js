const express = require('express');
const app = express();

// Settings
app.set('port' , 3500);


// Static Files
app.use(express.static('public'));

app.listen(app.get('port') , () => {
    console.log('Server Started on Port -> ' + app.get('port'));
});