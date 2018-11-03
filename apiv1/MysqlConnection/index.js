const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : 'xxxxxxxxxxx',
    user     : 'xxxxxxxxxxx',
    password : 'xxxxxxxxxxx',
    database : 'xxxxxxxxxxx'
});

/*
const connection = mysql.createConnection({
  host     : '103.48.81.8',
  user     : 'ujzbuikm_drugpital',
  password : 'anhkhoa2210',
  database : 'ujzbuikm_drugpital'
});*/

module.exports = connection;
