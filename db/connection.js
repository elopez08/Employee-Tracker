const mysql = require('mysql2');

//We're going to establish a connection for the data
const db = mysql.createConnection({
    //Have it localized
    host: `localhost`,
    //Using Port: 3001
    port: 3001,
    //For now, have the user be 'root'
    user: `root`,
    //Our password that we use for the SQL
    password: `Lulu123!`,
    //database: 
    database: 'employee_DB'
});

module.exports= db;