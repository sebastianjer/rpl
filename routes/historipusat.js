var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req,res,next){
  let query = "SELECT * FROM pemesanan"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
      if (err) {
          res.redirect('/');
      }
      console.log("aaa")
      res.render('historipusat', {
          title: "Histori Pusat"
          ,historys: result
      });
      console.log(result.length);
      console.log(result);
  });
});

module.exports = router;
