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

  console.log('hiii')

  });



module.exports = router;
