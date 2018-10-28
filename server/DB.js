var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database : 'pweb'
})

connection.connect()

module.exports = connection;