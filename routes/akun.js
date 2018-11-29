var db = require('./db');
//const fs = require('fs');

function addData (sql,tabel,res) {
	connection.query(sql,tabel, function (error, results, fields) {
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
}
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

			let usernameQuery = "SELECT username,password FROM t_centre WHERE username = '"+user.username +"' UNION ALL SELECT username,password FROM t_partner WHERE username = '" + user.username + "'";
				connection.query(usernameQuery, (err, result) => {
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
							let sql = 'INSERT INTO t_centre SET ?'
							addData(sql,user,res);
						} else {
							let sql = 'INSERT INTO t_partner SET ?'
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

        let query = "SELECT username,password FROM t_centre WHERE username = '"+uname +"' UNION ALL SELECT username,password FROM t_partner WHERE username = '" + uname + "'";
        connection.query(query, (err, result) => {
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
			let check = "SELECT username,password FROM t_centre WHERE username = '"+uname +"' UNION ALL SELECT username,password FROM t_partner WHERE username = '" + uname + "'";
			connection.query(check, (err, result) => {
				if (err) {
					return res.status(500).send(err);
				}
				console.log(result[0].password);
				if (result[0].password==currPassword) {
					let where = "SELECT * FROM t_centre WHERE username = '"+uname+"'";
					connection.query(where, (err, result) => {
						if (err) {
							return res.status(500).send(err);
						}
						if (result.length > 0) {
							query = "UPDATE t_centre SET `password` = '" + newPassword + "' WHERE username = '" + uname + "'";
						} else {
							query = "UPDATE t_partner SET `password` = '" + newPassword + "' WHERE username = '" + uname + "'";
						}
						connection.query(query, (err, result) => {
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

        let where = "SELECT * FROM t_centre WHERE username = '"+uname+"'";
		connection.query(where, (err, result) => {
			if (err) {
				return res.status(500).send(err);
			}
			if (result.length > 0) {
				deleteUserQuery = 'DELETE FROM t_centre WHERE username = "' + uname + '"';
			} else {
				deleteUserQuery = 'DELETE FROM t_partner WHERE username = "' + uname + '"';
			}
			connection.query(deleteUserQuery, (err, result) => {
				if (err) {
					return res.status(500).send(err);
				}
				res.redirect('/');
			});
		});
    }
};
