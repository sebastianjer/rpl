var express = require('express');
var router = express.Router();

var db = require('./db');
//const fs = require('fs');

function addData (sql,tabel,res) {
	db.query(sql,tabel, function (error, results, fields) {
    if (error) {
      console.log("error ocurred",error);
      res.send({
        "code":400,
        "failed":"error ocurred"
      })
    }else{
      console.log('The solution is: ', results);
			res.redirect('/mainadmin')
      /*
			res.send({
        "code":200,
        "success":"user registered sucessfully"
      });
			*/
    }
  });
}

/*
app.get('/addAccount', addAccountPage);
app.get('/editPassword/:id', editPasswordPage);
app.get('/deleteAccount/:id', deleteAccount);
app.post('/addAcc', addAccount);
app.post('/editPassword/:id', editPassword);
*/

router.get('/addAccount', function(req,res,next){
  res.render('addAccount', {
      title: "Manajemen Akun | Penambahan Akun"
      ,message: ''
  });
});

router.get('/editPassword/:id', function(req,res,next){
  let uname = req.params.id;

  let query = "SELECT username,password FROM centre WHERE username = '"+uname +"' UNION ALL SELECT username,password FROM partner WHERE username = '" + uname + "'";
  db.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }

      res.render('changePassword', {
          title: "Manajemen Akun | Pengubahan Password"
          ,player: result[0]
          ,message: ''
      });
  });
});

router.get('/deleteAccount/:id', function(req,res,next){
  let uname = req.params.id;
  var deleteUserQuery;
  let where = "SELECT * FROM centre WHERE username = '"+uname+"'";
  db.query(where, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.length > 0) {
      deleteUserQuery = 'DELETE FROM centre WHERE username = "' + uname + '"';
    } else {
      deleteUserQuery = 'DELETE FROM partner WHERE username = "' + uname + '"';
    }
    db.query(deleteUserQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.redirect('/accountList');
    });
  });
});

router.post('/addAcc', function(req,res){
  const request = req.body;
  let accType = request.accType;
  if ((request.username != '') && (request.password != '')) {
    var user = {
      "username" : request.username,
      "password" : request.password
    }

    let usernameQuery = "SELECT username,password FROM centre WHERE username = '"+user.username +"' UNION ALL SELECT username,password FROM partner WHERE username = '" + user.username + "'";
    db.query(usernameQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
				res.redirect('/manageAccount/addAcc');
				console.log({
          "code":2000,
          "failed":"Username already exist"
        })
      } else {
        if (accType=='center') {
          let sql = 'INSERT INTO centre SET ?'
          addData(sql,user,res);
        } else {
          let sql = 'INSERT INTO partner SET ?'
          addData(sql,user,res);
        }
      }
    });

  } else {
		res.redirect('/manageAccount/addAcc');
    console.log({
      "code":1000,
      "failed":"required data is not complete"
    })
  }
});

router.post('/editPassword/:id', function(req,res){
  let uname = req.params.id;
  let currPassword = req.body.currPassword;
  let newPassword = req.body.newPassword;
  var query;
  if ((currPassword != '') && (newPassword != '')) {
    let check = "SELECT username,password FROM centre WHERE username = '"+uname +"' UNION ALL SELECT username,password FROM partner WHERE username = '" + uname + "'";
    db.query(check, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      console.log(result[0].password);
      if (result[0].password==currPassword) {
        let where = "SELECT * FROM centre WHERE username = '"+uname+"'";
        db.query(where, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }
          if (result.length > 0) {
            query = "UPDATE centre SET `password` = '" + newPassword + "' WHERE username = '" + uname + "'";
          } else {
            query = "UPDATE partner SET `password` = '" + newPassword + "' WHERE username = '" + uname + "'";
          }
          db.query(query, (err, result) => {
            if (err) {
              return res.status(500).send(err);
            }
            res.redirect('/mainadmin');
          });
        });
      } else {
				res.redirect('/manageAccount/editPassword/:id');
				console.log({
          "code":2000,
          "failed":"Input doesn't match current password"
        })
      }
    });
  } else {
		res.redirect('/manageAccount/editPassword/:id');
    console.log({
      "code":1000,
      "failed":"required data is not complete"
    })
  }
});

module.exports = router;


/*
module.exports = {
    addAccountPage: (req, res) => {
        res.render('addAccount', {
            title: "Manajemen Akun | Penambahan Akun"
            ,message: ''
        });
    },
    addAccount: (req, res) => {
        const request = req.body;
		let accType = request.accType;
		if ((request.username != '') && (request.password != '')) {
			var user = {
				"username" : request.username,
				"password" : request.password
			}

			let usernameQuery = "SELECT username,password FROM centre WHERE username = '"+user.username +"' UNION ALL SELECT username,password FROM partner WHERE username = '" + user.username + "'";
				db.query(usernameQuery, (err, result) => {
					if (err) {
						return res.status(500).send(err);
					}
					if (result.length > 0) {
						res.send({
							"code":2000,
							"failed":"Username already exist"
						})
					} else {
						if (accType=='center') {
							let sql = 'INSERT INTO centre SET ?'
							addData(sql,user,res);
						} else {
							let sql = 'INSERT INTO partner SET ?'
							addData(sql,user,res);
						}
					}
				});

		} else {
			res.send({
				"code":1000,
				"failed":"required data is not complete"
			})
		}
    },
    editPasswordPage: (req, res) => {
        let uname = req.params.id;

        let query = "SELECT username,password FROM centre WHERE username = '"+uname +"' UNION ALL SELECT username,password FROM partner WHERE username = '" + uname + "'";
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.render('changePassword', {
                title: "Manajemen Akun | Pengubahan Password"
                ,player: result[0]
                ,message: ''
            });
        });
    },
    editPassword: (req, res) => {
        let uname = req.params.id;
        let currPassword = req.body.currPassword;
        let newPassword = req.body.newPassword;
        var query;
	    if ((currPassword != '') && (newPassword != '')) {
			let check = "SELECT username,password FROM centre WHERE username = '"+uname +"' UNION ALL SELECT username,password FROM partner WHERE username = '" + uname + "'";
			db.query(check, (err, result) => {
				if (err) {
					return res.status(500).send(err);
				}
				console.log(result[0].password);
				if (result[0].password==currPassword) {
					let where = "SELECT * FROM centre WHERE username = '"+uname+"'";
					db.query(where, (err, result) => {
						if (err) {
							return res.status(500).send(err);
						}
						if (result.length > 0) {
							query = "UPDATE centre SET `password` = '" + newPassword + "' WHERE username = '" + uname + "'";
						} else {
							query = "UPDATE partner SET `password` = '" + newPassword + "' WHERE username = '" + uname + "'";
						}
						db.query(query, (err, result) => {
							if (err) {
								return res.status(500).send(err);
							}
							res.redirect('/');
						});
					});
				} else {
					res.send({
						"code":2000,
						"failed":"Input doesn't match current password"
					})
				}
			});
		} else {
			res.send({
				"code":1000,
				"failed":"required data is not complete"
			})
		}

    },
    deleteAccount: (req, res) => {
        let uname = req.params.id;
        var deleteUserQuery;

        let where = "SELECT * FROM centre WHERE username = '"+uname+"'";
		    db.query(where, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			if (result.length > 0) {
				deleteUserQuery = 'DELETE FROM centre WHERE username = "' + uname + '"';
			} else {
				deleteUserQuery = 'DELETE FROM partner WHERE username = "' + uname + '"';
			}
			db.query(deleteUserQuery, (err, result) => {
				if (err) {
					return res.status(500).send(err);
				}
				res.redirect('/');
			});
		});
    }
};
*/
