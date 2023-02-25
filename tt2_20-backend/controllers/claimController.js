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
  res.send("NOT IMPLEMENTED: insert new claim");
};

exports.update_claim = (req, res) => {
    res.send("NOT IMPLEMENTED: update exsiting claim");
};

exports.delete_claim = (req, res) => {
    conn.query("DELETE FROM insuranceclaims WHERE claimid = ?",
        [req.body.claimId],
        (err, result) => {
            if (err) throw err
            res.send(200)
        })
};
