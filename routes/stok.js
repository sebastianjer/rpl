var express = require('express');
var router = express.Router();

var db = require('./db');

router.get('/bahan',(req,res)=>{
  let query = "SELECT * FROM material";

  db.query(query, (err, result) => {
      if (err) {
          res.redirect('/');
      }
      //console.log("aaa")
      res.render('daftarBahan', {
          title: "Daftar Bahan"
          ,stocks: result
      });
      console.log(result.length);
      console.log(result);
  });
})

router.get('/update',(req,res)=>{
  res.render('updateStokBahan');
})

router.get('/tambah',(req,res)=>{
  res.render('tambahBahan');
})

router.post('/update',(req,res)=>{
  var material_name = req.body.material_name;
	var newStock = req.body.stock;

  let query = "UPDATE material SET stock = '" + newStock + "' WHERE material_name = '" + material_name + "'";
  db.query(query, (err, result) => {
      if (err){
        console.log(err);
      }else{
        console.log("Update bahan baku berhasil dilakukan");
      }
      res.redirect('/stok/bahan');
  });
	// res.render('updateStokBahan.jade')
})

router.post('/tambah',(req,res)=>{
  var insert = {
    "material_id":req.body.material_id,
    "material_name":req.body.material_name,
    "stock":req.body.stock,
  }

  db.query('INSERT INTO material SET ?', insert, function(err, results, fields) {
      if (err){
        console.log(err);
      }else{
        console.log("Bahan baku berhasil ditambahkan");
      }
      res.redirect('/stok/bahan');
  });
	// res.render('updateStokBahan.jade')
})

/*
router.get('/bahan',(req,res)=>{
	res.render('daftarBahan.jade')
})

router.get('/bahan/update',(req,res)=>{
	res.render('updateStokBahan.jade')
})

router.get('/bahan/tambah',(req,res)=>{
	res.render('tambahBahan.jade')
})
*/

module.exports = router;
