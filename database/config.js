const mysql = require('mysql');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'database_development',
    port: 8888
});

module.exports = connection;