const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: ''
})

connection.connect()

module.exports = connection