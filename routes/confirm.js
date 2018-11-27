var express = require('express');
var router = express.Router();
var db = require('./db');

//diterima
router.post('/accept', function(req,res) {
  var order_id = req.body.order_id;

  db.query("UPDATE pemesanan SET status = 'diterima' WHERE order_id = ?", [order_id], function(error, results, fields){
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

  db.query("UPDATE pemesanan SET status = 'ditolak' WHERE order_id = ?", [order_id], function(error, results, fields){
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
