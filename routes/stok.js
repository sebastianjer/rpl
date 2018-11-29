/*
var express = require('express');
var router = express.Router();

var db = require('./db');

router.get('/bahan',(req,res)=>{
	res.render('daftarBahan.jade')
})

router.get('/update',(req,res)=>{
	res.render('updateStokBahan.jade')
})

router.post('/update',(req,res)=>{
	var bahan = req.body.bahan;
	var jumlah = req.body.jumlah;

  let query = "INSERT INTO "

	console.log(bahan);
	console.log(jumlah);
	res.redirect('/main');
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

//module.exports = router;
