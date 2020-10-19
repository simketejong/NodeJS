var mysql = require('mysql');
var http = require('http');
var url = require('url');
let fft = require("ezfft").fft;
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
       connect.query(sql, function (err, result) {
           if (err) throw err;
           console.log("Table DATA created");
       });
       var valueFloat = parseFloat(getal);
       var sql = "INSERT INTO DATA (name, valueRAW) VALUES ('"+Name+"', '"+valueFloat+"')";
       connect.query(sql, function (err, result) {
         if (err) throw err;
         console.log("1 record inserted");
       })
// Neural Table

        var sql = "CREATE TABLE IF NOT EXISTS NEURAL (current FLOAT," +
          " average5 FLOAT," +
          " average10 FLOAT," +
          " average15 FLOAT," +
          " max5 FLOAT," +
          " min5 FLOAT," +
          " max10 FLOAT," +
          " min10 FLOAT," +
          " max15 FLOAT," +
          " min15 FLOAT," +
          " harmonic1_5 FLOAT )";
          " harmonic2_5 FLOAT )";
          " harmonic1_10 FLOAT )";
          " harmonic2_10 FLOAT )";
          " harmonic1_15 FLOAT )";
          " harmonic2_15 FLOAT )";
        connect.query(sql, function (err, result) {
        if (err) throw err;
            console.log("Table NEURAL created");
        });

        var sql = "SELECT AVG(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 5 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var av5 = json[0]['AVG(valueRAW)']
        })
        var sql = "SELECT AVG(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var av10 = json[0]['AVG(valueRAW)']
        })
        var sql = "SELECT AVG(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 15 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var av15 = json[0]['AVG(valueRAW)']
        })
        var sql = "SELECT MAX(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 5 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var max5 = json[0]['MAX(valueRAW)']
        })
        var sql = "SELECT MAX(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var max10 = json[0]['MAX(valueRAW)']
        })
        var sql = "SELECT MAX(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 15 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var max15 = json[0]['MAX(valueRAW)']
        })
        var sql = "SELECT MIN(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 5 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var max5 = json[0]['MIN(valueRAW)']
        })
        var sql = "SELECT MIN(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var max10 = json[0]['MIN(valueRAW)']
        })
        var sql = "SELECT MIN(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 15 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
//            console.log(json[0]['AVG(valueRAW)']);
        var max15 = json[0]['MIN(valueRAW)']
        })

        var sql = "SELECT valueRAW FROM DATA WHERE date > date_sub(now(), interval 5 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            harm = [];
        for (i = 0; i < result.length; i++) {
            harm.push(json[i]['valueRAW'])
        }
        let data = fft(harm, result.length);    //OMG ITS EZ AS F*
//        console.log(data.frequency.amplitude);  //Amplitude axis
//        console.log(data.frequency.phase);      //Phase axis
//        console.log(data.frequency.frequency);  //Frequency axis
        harmonic1_5=data.frequency.frequency[0];
        harmonic2_5=data.frequency.frequency[1];
        })

        var sql = "SELECT valueRAW FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            harm = [];
        for (i = 0; i < result.length; i++) {
            harm.push(json[i]['valueRAW'])
        }
        let data = fft(harm, result.length);    //OMG ITS EZ AS F*
        harmonic1_10=data.frequency.frequency[0];
        harmonic2_10=data.frequency.frequency[1];
        })

        var sql = "SELECT valueRAW FROM DATA WHERE date > date_sub(now(), interval 15 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            harm = [];
        for (i = 0; i < result.length; i++) {
            harm.push(json[i]['valueRAW'])
        }
        let data = fft(harm, result.length);    //OMG ITS EZ AS F*
        harmonic1_15=data.frequency.frequency[0];
        harmonic2_15=data.frequency.frequency[1];
        })

        var sql = "CREATE TABLE IF NOT EXISTS NEURAL (current FLOAT," +
          " average5 FLOAT," +
          " average10 FLOAT," +
          " average15 FLOAT," +
          " max5 FLOAT," +
          " min5 FLOAT," +
          " max10 FLOAT," +
          " min10 FLOAT," +
          " max15 FLOAT," +
          " min15 FLOAT," +
          " harmonic1_5 FLOAT )";
          " harmonic2_5 FLOAT )";
          " harmonic1_10 FLOAT )";
          " harmonic2_10 FLOAT )";
          " harmonic1_15 FLOAT )";
          " harmonic2_15 FLOAT )";
          var valueFloat = parseFloat(getal);
          var sql = "INSERT INTO NEURAL (average5, average10, average15, max5, max10, max15, min5, min10, min15, harmonic1_5, harmonic2_5, harmonic1_10, harmonic2_10, harmonic1_15, harmonic2_15 ) "+
                " VALUES ('"+Name+"', '"+valueFloat+"')";
          connect.query(sql, function (err, result) {
            if (err) throw err;
            console.log("1 record inserted");
          })

//////
    });
};
