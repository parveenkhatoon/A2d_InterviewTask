
var mysql = require('mysql');

var node_connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "P@rv9958",
  insecureAuth : true,
  database:"A2d"
});

node_connection.connect(function(err){
  if (err) throw err;
  console.log("Connected!");
});


module.exports = node_connection

