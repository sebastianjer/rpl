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
  res.render('pemesanan');
  //res.render('index', { title: 'Express' );
});

router.post('/', function(req, res){
  var today = new Date();
  var order = {
    "order_id":req.body.order_id,
    "order_date":today,
    "status":"pending",
    "amount":req.body.amount,
    "material_name":req.body.material_name,
    "username":req.body.username
  }

  connection.query('INSERT INTO pemesanan SET ?',order, function (error, results, fields) {
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
        "success":"pemesanan berhasil dilakukan"
          });
    }
  });
});

module.exports = router;
