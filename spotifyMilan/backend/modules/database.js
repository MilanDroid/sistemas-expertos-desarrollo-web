var mongoose = require('mongoose');

var server = 'localhost:27017';
var db = 'spotify';

class Database {
    constructor () {
        mongoose.connect(`mongodb://${server}/${db}`)
        .then(() => {
            console.log('Database connected');
        })
        .catch((error) => {
            console.log(`Database Error. ${error}`);
        });
    }
}

module.exports = new Database();