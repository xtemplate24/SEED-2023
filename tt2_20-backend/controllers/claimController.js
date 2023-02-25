var conn = require('../db/db_conn.js')

exports.get_claims = (req, res) => {
    conn.query("SELECT ic.claimId, ic.insuranceId, ic.firstName, ic.lastName, STR_TO_DATE(ic.expenseDate, '%Y-%m-%d') expenseDate, ic.amount, ic.purpose, IF(ic.followUp = 1, 'TRUE', 'FALSE') followUp, ic.previousClaimId, ic.status, STR_TO_DATE(ic.lastEditedClaimDate, '%Y-%m-%d') lastEditedClaimDate, ip.insuranceId, ip.insuranceType FROM user u JOIN insurancepolicies ip ON u.employeeid = ip.employeeid JOIN insuranceclaims ic ON ip.insuranceid = ic.insuranceid WHERE u.employeeid = ?",
        [req.params.employeeId],
        (err, result) => {
            if (err) throw err
            res.send(result)
        })
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
    let claimId = req.body.claimId;
    let insuranceId = req.body.insuranceId;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let expenseDate = req.body.expenseDate;
    let amount = req.body.amount;
    let purpose = req.body.purpose;
    let followUp = req.body.followUp;
    let previousClaimId = req.body.previousClaimId;
    let status = req.body.status;
    var today = new Date();
    let lastEditedClaimDate = String(today)
    console.log(lastEditedClaimDate)
  
    console.log(req.body);
  
    conn.query(
      "UPDATE insuranceclaims SET FirstName = ?, LastName = ?, Amount = ?, Purpose = ?, FollowUp = ?, PreviousClaimID = ?, Status = ?, LastEditedClaimDate = ? WHERE ClaimID = ?",
      // "UPDATE insuranceclaims SET FirstName = ?, LastName = ? WHERE ClaimID = ?",
  
      [
        firstName,
        lastName,
        amount,
        purpose,
        followUp,
        previousClaimId,
        status,
        lastEditedClaimDate,
        claimId,
      ],
      function (err, data) {
        // if (err) return next(new AppError(err, 500));
        console.log(err);
        console.log(data);
        res.status(200).json({
          status: "change success",
          data: data,
        });
      }
    );
  };

exports.delete_claim = (req, res) => {
    conn.query("DELETE FROM insuranceclaims WHERE claimid = ?",
        [req.body.claimId],
        (err, result) => {
            if (err) throw err
            res.send(200)
        })
};
