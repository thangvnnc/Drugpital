const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : '103.7.40.108',
    user     : 'drugpital',
    password : 'ktteam22101509',
    database : 'zadmin_drug'
});

module.exports = connection;
