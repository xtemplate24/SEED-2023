var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})

//Editted to get the login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

//Editted login page inputs
app.post('/login', (req, res) => {
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