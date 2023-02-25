var mysql = require('mysql2')

const conn = mysql.createConnection(
    {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'insurancedata'
    }
)

module.exports = conn