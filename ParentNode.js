var mysql = require('mysql');
var http = require('http');
var url = require('url');
let fft = require("ezfft").fft;
var teller=0;
var av10 = 0;
var av20 = 0;
var av30 = 0;
var max10 = 0;
var max20 = 0;
var max30 = 0;
var min10 = 0;
var min20 = 0;
var min30 = 0;
var harmonic1_10 = 0;
var harmonic2_10 = 0;
var harmonic1_20 = 0;
var harmonic2_20 = 0;
var harmonic1_30 = 0;
var harmonic2_30 = 0;
var con = mysql.createConnection({
  host: "localhost",
  user: "simke",
  password: "deadfred"
});

con.connect(function(err) {
  if (err) throw err;
//  console.log("Connected!");
});

http.createServer(function (req, res) {
  teller++;
  res.writeHead(200, {'Content-Type': 'text/html'});
  var q = url.parse(req.url, true).query;
//  console.log(JSON.stringify(q).length);
  var txt = q.ID + " " + q.value;
  if ( JSON.stringify(q).length > 2 )  { // No empty requests
//      console.log("ID = " + q.ID + " Value " + q.value);
      DataBase(q.ID,q.value);
  }
  res.end(txt);
}).listen(23180);

function DataBase (Name, getal){
    con.query("CREATE DATABASE IF NOT EXISTS "+ Name, function (err, result) {
        if (err) throw err;
//        console.log("Database "+ Name +" created");
    })

    var connect = mysql.createConnection({
      host: "localhost",
      user: "simke",
      password: "deadfred",
      database: Name
    });

    connect.connect(function(err) {
    if (err) throw err;
//        console.log("Connected Database "+Name);
//    var sql = "CREATE TABLE IF NOT EXISTS DATA (id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT, value FLOAT)";
        var sql = "CREATE TABLE IF NOT EXISTS DATA (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), valueRaw FLOAT," +
                  " date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP )";
       connect.query(sql, function (err, result) {
           if (err) throw err;
//           console.log("Table DATA created");
       });
       var valueFloat = parseFloat(getal);
       var sql = "INSERT INTO DATA (name, valueRAW) VALUES ('"+Name+"', '"+valueFloat+"')";
       connect.query(sql, function (err, result) {
         if (err) throw err;
//         console.log("1 record inserted");
       })
// Neural Table

        var sql = "CREATE TABLE IF NOT EXISTS NEURAL (current FLOAT," +
          " date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP," +
          " average10 FLOAT," +
          " average20 FLOAT," +
          " average30 FLOAT," +
          " max10 FLOAT," +
          " min10 FLOAT," +
          " max20 FLOAT," +
          " min20 FLOAT," +
          " max30 FLOAT," +
          " min30 FLOAT," +
          " harmonic1_10 FLOAT," +
          " harmonic2_10 FLOAT," +
          " harmonic1_20 FLOAT," +
          " harmonic2_20 FLOAT," +
          " harmonic1_30 FLOAT," +
          " harmonic2_30 FLOAT )";
        connect.query(sql, function (err, result) {
        if (err) throw err;
        });

        var sql = "SELECT AVG(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            av10 = json[0]['AVG(valueRAW)']
        })
        var sql = "SELECT AVG(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 20 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);

            av20 = json[0]['AVG(valueRAW)']
        })
        var sql = "SELECT AVG(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 30 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            av30 = json[0]['AVG(valueRAW)']
        })
        var sql = "SELECT MAX(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            max10 = json[0]['MAX(valueRAW)']
        })
        var sql = "SELECT MAX(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 20 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            max20 = json[0]['MAX(valueRAW)']
        })
        var sql = "SELECT MAX(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 30 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            max30 = json[0]['MAX(valueRAW)']
        })
        var sql = "SELECT MIN(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            min10 = json[0]['MIN(valueRAW)']
        })
        var sql = "SELECT MIN(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 20 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            min20 = json[0]['MIN(valueRAW)']
        })
        var sql = "SELECT MIN(valueRAW) FROM DATA WHERE date > date_sub(now(), interval 30 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            min30 = json[0]['MIN(valueRAW)']
        })
/*
        var sql = "SELECT valueRAW FROM DATA WHERE date > date_sub(now(), interval 10 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            harm = [];
        for (i = 0; i < result.length; i++) {
            harm.push(json[i]['valueRAW'])
        }
        harmonic1_10=0;
        harmonic2_10=0;
        if ( harm.length > 2 ){
            let data = fft(harm, result.length*10);    //OMG ITS EZ AS F*
//        console.log(data.frequency.amplitude);  //Amplitude axis
//        console.log(data.frequency.phase);      //Phase axis
//        console.log(data.frequency.frequency);  //Frequency axis
            harmonic1_10=data.frequency.amplitude[0];
            harmonic2_10=data.frequency.phase[0];
        }
        })
        var sql = "SELECT valueRAW FROM DATA WHERE date > date_sub(now(), interval 20 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            harm = [];
        for (i = 0; i < result.length; i++) {
            harm.push(json[i]['valueRAW'])
        }
        harmonic1_20=0;
        harmonic2_20=0;
        if ( harm.length > 2 ){
            let data = fft(harm, result.length);    //OMG ITS EZ AS F*
            harmonic1_20=data.frequency.amplitude[0];
            harmonic2_20=data.frequency.phase[0];
        }
        })
*/
        var sql = "SELECT valueRAW FROM DATA WHERE date > date_sub(now(), interval 30 second)";
        connect.query(sql, function (err, result, fields) {
        if (err) throw err;
            var string=JSON.stringify(result);
            var json =  JSON.parse(string);
            harm = [];
        for (i = 0; i < result.length; i++) {
            harm.push(json[i]['valueRAW'])
        }
        harmonic1_30=0;
        harmonic2_30=0;
        if ( harm.length > 2 ){
            let data = fft(harm, result.length);    //OMG ITS EZ AS F*
            harmonic1_30=data.frequency.amplitude[0];
            harmonic2_30=data.frequency.phase[0];
        }
        })
       var sql = "INSERT INTO NEURAL (current, average10, average20, average30, max10, max20, max30, min10, min20, min30, harmonic1_10, harmonic2_10, harmonic1_20, harmonic2_20, harmonic1_30, harmonic2_30 ) "+
                 " VALUES ('"+getal+"','"+av10+"', '"+av20+"','"+av30+"', '"+max10+"','"+max20+"', '"+max30+"','"+min10+"', '"+min20+"','"+min30+"', '"+harmonic1_10+"','"+harmonic2_10+"', '"+harmonic1_20+"','"+harmonic2_20+"', '"+harmonic1_30+"', '"+harmonic2_30+"')";
       connect.query(sql, function (err, result) {
       if (err) throw err;
       })
    });
};
