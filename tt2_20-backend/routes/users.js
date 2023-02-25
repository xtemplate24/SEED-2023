var express = require("express");
var router = express.Router();
const conn = require("../db/db_conn");

/* GET users listing. */

router.get("/create", function (req, res, next) {
  res.send("respond with a resource");
});

router.get('/create', function(req, res, next) {
  res.send('respond with a resource');


  
});

//Editted login page inputs
router.post("/login", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  // let password = req.body.password;
  // if (username === 'admin' && password === 'admin') {
  //     res.send('Login successful');
  // }
  // else {
  //     res.send('Login failed');
  // }
  console.log(username, password);
  conn.query(
    "SELECT * FROM user WHERE EmployeeID = ?",
    [username],
    function (err, data) {
      if (err) return next(new AppError(err, 500));
      if (
        username == data[0]["EmployeeID"] &&
        password == data[0]["Password"]
      ) {
        res.status(201).json({
          status: "success",
          data_length: data?.length,
          data: data,
        });
      } else {
        res.status(401).json({
          status: "incorrect username or password",

        });
      }
    }
  );
});

module.exports = router;
