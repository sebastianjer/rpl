var express = require('express');
var router = express.Router();

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

/* GET home page. */
router.get('/', function(req, res, next) {
  var username = "";
  connection.query('SELECT * FROM pemesanan WHERE username = ?',[username], function (error, results, fields) {
    if (error){
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      res.render('historimitra', {
        order_id: results[0],
        order_date: results[1],
        status: results[2],
        amount: results[3],
        material_name: results[4],
        username: results[5]
      });
    }
  });
  //res.render('index', { title: 'Express' );
});

module.exports = router;
