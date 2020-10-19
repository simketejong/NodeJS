var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "simke",
  password: "deadfred"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
