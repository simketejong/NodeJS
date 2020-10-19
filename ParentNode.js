var mysql = require('mysql');
var http = require('http');
var url = require('url');
var teller=0;

var con = mysql.createConnection({
  host: "localhost",
  user: "simke",
  password: "deadfred"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

http.createServer(function (req, res) {
  teller++;
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
  var txt = q.ID + " " + q.value;
  if ( teller == 1 ){
      console.log("ID = " + q.ID + " Value " + q.value);
      DataBase(q.ID,q.value);

  }
  res.end(txt);
}).listen(23180);

function DataBase (Name, getal){
    con.query("CREATE DATABASE IF NOT EXISTS "+ Name, function (err, result) {
  if (err) throw err;
  console.log("Database "+ Name +" created");
});

}
