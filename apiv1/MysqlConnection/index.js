const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'medixlinkcom',
    password : 'ecc9408da3baadfe833a5',
    database : 'medixlink_c_bf31'
});

module.exports = connection;
