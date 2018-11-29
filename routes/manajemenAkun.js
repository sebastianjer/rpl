var express = require('express');
var router = express.Router();
var db = require('./db');

router.get('/', function(req,res,next){
  let query = "SELECT username,password FROM centre UNION ALL SELECT username,password FROM partner"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
      if (err) {
          res.redirect('/');
      }
      console.log("aaa")
      res.render('manajemenAkun', {
          title: "Manajemen Akun | List Akun"
          ,accounts: result
      });
      console.log(result.length);
      console.log(result);
  });
});

module.exports = router;

/*
module.exports = {
    getHomeMA: (req, res) => {
        let query = "SELECT username,password FROM centre UNION ALL SELECT username,password FROM partner"; // query database to get all the players

        // execute query
        connection.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            res.render('manajemenAkun', {
                title: "Manajemen Akun | List Akun"
                ,accounts: result
            });
            console.log(result.length);
            console.log(result);
        });
    },
};
*/
