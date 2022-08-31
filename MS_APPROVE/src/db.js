const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'db-appove',
    user: 'root',
    password: ''
})

connection.connect()

module.exports = connection