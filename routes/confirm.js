var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET data from database */
router.get('/', function(req,res,next){
  let query = "SELECT * FROM pemesanan WHERE status = 'pending'"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
      if (err) {
          res.redirect('/');
      }
      console.log("aaa")
      res.render('confirm', {
          title: "Konfirmasi Bahan Baku"
          ,confirms: result
      });
      console.log(result.length);
      console.log(result);
  });
});

//diterima
router.post('/accept/:id/:amount/:material_name', function(req,res) {
  var order_id = req.params.id;

  db.query("UPDATE pemesanan SET status = 'diterima' WHERE order_id = ?", [order_id], function(error, results, fields){
    if (error){
      console.log({
        "code":400,
        "status" : "failed to accept"
      })
    }else{
      console.log("Accept successful");
    }
  })

  /* di sini bisa query nge deletenya kah?? */

  var amount = req.params.amount;
  var material_name = req.params.material_name;
  db.query("UPDATE material SET stock = stock - ? WHERE material_name = ? and stock > 0", [amount, material_name], function(error, results, fields){
    if (error){
      res.send({
        "code":400,
        "status" : "failed to decrease"
      })
    }else{
      res.send("Decrease successful");
    }
  })
});

//ditolak
router.post('/decline/:id/', function(req,res) {
  var order_id = req.params.id;

  db.query("UPDATE pemesanan SET status = 'ditolak' WHERE order_id = ?", [order_id], function(error, results, fields){
    if (error){
      res.send({
        "code":400,
        "status" : "failed to decline"
      })
    }else{
      res.send("Decline successful");
    }
  })
});

module.exports = router;
