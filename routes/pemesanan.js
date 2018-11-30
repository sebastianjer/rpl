var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET home page. */
/* router.get('/', function(req, res, next) {
  res.render('pemesanan');
  //res.render('index', { title: 'Express' );
}); */

/* GET data from database */
router.get('/', function(req,res,next){
  let query = "SELECT * FROM material"; // query database to get all the players

  // execute query
  db.query(query, (err, result) => {
      if (err) {
          res.redirect('/');
      }
      //console.log("aaa")
      res.render('pemesanan', {
          title: "Pemesanan Bahan Baku"
          ,materials: result
      });
      console.log(result.length);
      console.log(result);
  });
});

module.exports = router;

/* INSERT data into database */
router.post('/pemesanan', function(req, res){
  var today = new Date();
  var order = {
    "order_id":req.body.order_id,
    "order_date":today,
    "status":"pending",
    "amount":req.body.amount,
    "material_name":req.body.material_name,
    "username":uname
  }

  db.query('INSERT INTO pemesanan SET ?',order, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
      res.render('main');

    }
  });

});

module.exports = router;
