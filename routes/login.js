//login.js untuk login dan register
var express = require('express');
var router = express.Router();

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
    console.log("Database is connected ... nn");
  } else {
    console.log("Error connecting database ... nn");
  }
});

//GET page login
router.get('/login', function(req,res,next){
  res.render('login');
});



//POST username dan password
//register handler
router.post('/register', function(req,res){
  // console.log("req",req.body);
  var today = new Date();
  var users={
    "username":req.body.username,
    "password":req.body.password,
  }
  //jangan lupa nama tabel di querynya harus diganti
  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
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
  //jangan lupa nama tabel di querynya sama querynya sendiri harus diganti
  connection.query('SELECT * FROM users WHERE username = ?',[username], function (error, results, fields) {
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
          res.redirect('/main');
          /*
          res.send({
            "code":200,
            "success":"login successful"
          });
          */
        }
        else{
          res.send({
            "code":204,
            "success":"Email and password does not match"
          });
          //res.redirect('/login');
        }
      }
      else{
        res.send({
          "code":204,
          "success":"Email does not exits"
        });
        //res.redirect('/login');
      }
    }
  });
});



module.exports = router;