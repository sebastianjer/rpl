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

//diterima
router.post('/accept', function(req,res) {
  var order_id = req.body.order_id;

  connection.query("UPDATE pemesanan SET status = 'diterima' WHERE order_id = ?", [order_id], function(error, results, fields){
    if (error){
      res.send({
        "code":400,
        "status" : "failed to confirm"
      })
    }else{
      res.send("Confirm successful");
    }
  })
});


//ditolak
router.post('/decline', function(req,res) {
  var order_id = req.body.order_id;

  connection.query("UPDATE pemesanan SET status = 'ditolak' WHERE order_id = ?", [order_id], function(error, results, fields){
    if (error){
      res.send({
        "code":400,
        "status" : "failed to confirm"
      })
    }else{
      res.send("Confirm successful");
    }
  })
});

module.exports = router;
