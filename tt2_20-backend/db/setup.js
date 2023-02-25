var conn = require('./db_conn.js')
var fs = require('fs')
var path = require('path')

const generatedScript = fs.readFileSync(path.join(__dirname, './scripts/InsuranceData.sql')).toString();
const setup = () => conn.query(generatedScript,  (err, result) => {
    if (err){
         throw err;
    }else{
        console.log("Tables created successfully.");
    }
})

module.exports = setup