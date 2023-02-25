var conn = require('../db/db_conn.js')

exports.get_claims = (req, res) => {
    let claims = []
    conn.query("SELECT ic.* FROM user u JOIN insurancepolicies ip ON u.employeeid = ip.employeeid JOIN insuranceclaims ic ON ip.insuranceid = ic.insuranceid WHERE u.employeeid = ?",
        [req.params.employeeId],
        (err, result) => claims = result)
    console.log(claims)
    res.send("NOT IMPLEMENTED: get all claim based on insurance id");
};

exports.insert_claim = (req, res) => {
  res.send("NOT IMPLEMENTED: insert new claim");
};

exports.update_claim = (req, res) => {
    res.send("NOT IMPLEMENTED: update exsiting claim");
};

exports.delete_claim = (req, res) => {
    res.send("NOT IMPLEMENTED: delete existing claim");
};
