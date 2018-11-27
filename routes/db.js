//connect ke database
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tubesrpl'
});

connection.connect(function(err){
  if(!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting database");
  }
});

module.exports = connection;
