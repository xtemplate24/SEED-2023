var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/signup', function(req, res, next) {
  res.send('respond with a resource');
  
});

router.get('/create', function(req, res, next) {
  res.send('respond with a resource');


  
});

module.exports = router;
