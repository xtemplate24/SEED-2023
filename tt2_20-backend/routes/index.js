var express = require('express');
const conn = require("../db/db_conn");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  conn.query('SELECT * FROM insuranceclaims', function (err,data,field){
    if(err) return next(new AppError(err))
    res.status(200).json({
     status: "success",
     length: data?.length,
     data: data,
})
  })
  });
  router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username === 'admin' && password === 'admin') {
        res.send('Login successful');
    }
    else {
        res.send('Login failed');
    }
  })

module.exports = router;
