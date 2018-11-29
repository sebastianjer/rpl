var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req,res,next){
  var username = uname;
  console.log(username);
  let query = "SELECT * FROM pemesanan WHERE username = '"+username+"'"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
      if (err) {
          console.log(err);
          res.redirect('/');
      }else{
        res.render('historimitra', {
            title: "Histori Mitra",
            historymitras: result
        });
      }
      //console.log(result.length);
      //console.log(result);
  });
});

module.exports = router;
