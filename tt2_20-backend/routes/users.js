var express = require("express");
var router = express.Router();
const conn = require("../db/db_conn");

/* GET users listing. */

//CREATE API
router.post("/signup", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
  let firstname = req.query.firstname;
  let lastname = req.query.lastname;
  let age = req.query.age;

  const values = [username, password, firstname, lastname, age];

  conn.query(
    "SELECT * FROM user WHERE EmployeeID = ?",
    [username],
    function (err, data) {
      console.log(data)
      if (data.length == 0) {
        conn.query(
          "INSERT INTO user (EmployeeID, Password, FirstName, LastName, Age) VALUES(?)",
          [values],
          function (err, data) {
            res.status(201).json({
              status: "user created",
            });
          }
        );
      } else {
        res.status(401).json({
          status: "username exists",
        });
      }
    }
  );
});

//Login API
router.post("/login", (req, res) => {
  let username = req.query.username;
  let password = req.query.password;
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
