//Restoran pusat
var express = require('express');
var router = express.Router();
var db = require('./db');

//GET page login
router.get('/login', function(req,res,next){
  res.render('LoginAsPusat/adminl');
});

//POST username dan password
//register handler
router.post('/register', function(req,res){
  // console.log("req",req.body);
  //var today = new Date();
  var users={
    "username":req.body.username,
    "password":req.body.password,
  }
  //jangan lupa nama tabel di querynya harus diganti (tabel pusat)
  db.query('INSERT INTO centre SET ?',users, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.send({
        "code":200,
        "success":"user registered sucessfully"
          });
    }
  });
});

//login handler
router.post('/login', function(req,res){
  var username= req.body.username;
  var password = req.body.password;
  uname = username;

  //jangan lupa nama tabel di querynya sama querynya sendiri harus diganti (pusat)
  db.query('SELECT * FROM centre WHERE username = ?',[username], function (error, results, fields) {
    if (error) {
      // console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      // console.log('The solution is: ', results);
      if(results.length >0){
        if(results[0].password == password){
          res.render('mainadmin', {username: uname});
          /*
          res.send({
            "code":200,
            "success":"login successful"
          });
          */
        }
        else{
          res.redirect('/adminl/login');
          /*
          res.send({
            "code":204,
            "success":"Email and password does not match"
          });
          */
          //res.redirect('/login');
        }
      }
      else{
        res.redirect('/adminl/login');
        /*
        res.send({
          "code":204,
          "success":"Email does not exits"
        });
        */
        //res.redirect('/login');
      }
    }
  });
});



module.exports = router;
