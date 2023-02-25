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
  var eid = req.body.eid
  var iid = req.body.iid
  var expenseDate = req.body.ExpenseDate;
  var amount = req.body.Amount;
  var purpose = req.body.Purpose;
  var followUp = req.body.FollowUp == true ? 1 : 0;
  
  var sql = 'SELECT FirstName, LastName FROM User WHERE EmployeeID = ' + eid
  conn.query(sql, function (err, result, fields) {
    if (err) res.send("Failure");
    firstName = result[0].FirstName;
    lastName = result[0].LastName;

    var sql2 = 'SELECT MAX(ClaimID) AS MaxClaimId FROM InsuranceClaims WHERE InsuranceID = ' + iid;
    conn.query(sql2, function (err, result, fields) {
        if (err) res.send("Failure");
        var previousClaimId = result[0].MaxClaimId;
        var status = "Pending";
        var lastEditedClaimDate = new Date().toISOString().split('T')[0]
        
        var sql3 = `INSERT INTO InsuranceClaims (InsuranceID, FirstName, LastName, ExpenseDate, Amount, Purpose, FollowUp, PreviousClaimId, Status, LastEditedClaimDate) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        conn.query(sql3, [iid, firstName, lastName, expenseDate, amount, purpose, followUp, previousClaimId, status, lastEditedClaimDate], function (err, result, fields) {
            if (err) {
                res.send("Failure");
            } 
            res.send("Success");
        });
    });
  });
};

exports.update_claim = (req, res) => {
    res.send("NOT IMPLEMENTED: update exsiting claim");
};

exports.delete_claim = (req, res) => {
    res.send("NOT IMPLEMENTED: delete existing claim");
};
