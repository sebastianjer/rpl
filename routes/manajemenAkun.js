var db = require('./db');

module.exports = {
    getHomeMA: (req, res) => {
        let query = "SELECT username,password FROM t_centre UNION ALL SELECT username,password FROM t_partner"; // query database to get all the players

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
