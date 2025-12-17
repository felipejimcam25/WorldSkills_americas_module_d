const dotenv = require('dotenv');

const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'module_d'
})



connection.connect(err => {
    if(err) return console.log('ERROR CONNECTING DB');


    console.log('DB connected');

})

module.exports = connection;