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
  console.log(JSON.stringify(q).length);
  var txt = q.ID + " " + q.value;
  if ( JSON.stringify(q).length > 2 )  { // No empty requests
      console.log("ID = " + q.ID + " Value " + q.value);
      DataBase(q.ID,q.value);
  }
  res.end(txt);
}).listen(23180);

function DataBase (Name, getal){
    con.query("CREATE DATABASE IF NOT EXISTS "+ Name, function (err, result) {
        if (err) throw err;
        console.log("Database "+ Name +" created");
    })

    var connect = mysql.createConnection({
      host: "localhost",
      user: "simke",
      password: "deadfred",
      database: Name
    });

    connect.connect(function(err) {
    if (err) throw err;
        console.log("Connected Database "+Name);
//    var sql = "CREATE TABLE IF NOT EXISTS DATA (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, value FLOAT)";
        var sql = "CREATE TABLE IF NOT EXISTS DATA (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), valueRaw FLOAT," +
                  " average FLOAT," +
                  " max FLOAT," +
                  " date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP )";
//                 " date datetime NOT NULL DEFAULT NOW() )";
       console.log(sql);
       connect.query(sql, function (err, result) {
           if (err) throw err;
           console.log("Table created");
       });
       var valueFloat = parseFloat(getal);

//       var sql = "INSERT INTO DATA (name, valueRAW) VALUES ('"+Name+"',"+valueRAW+" )";
       var sql = "INSERT INTO DATA (name, valueRAW) VALUES ('"+Name+"', '"+valueFloat+"')";
       connect.query(sql, function (err, result) {
         if (err) throw err;
         console.log("1 record inserted");
       })
    });
};
