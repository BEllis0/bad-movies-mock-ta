const mysql = require('mysql');
const mysqlConfig = require('../../config.js');

const connection = mysql.createConnection(mysqlConfig);

module.exports.connection = connection;

module.exports.connection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('SQL database connected');
    }
})

