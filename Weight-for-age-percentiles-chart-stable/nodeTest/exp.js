var express = require('express');
const mysql = require('mysql');

var bodyParser = require('body-parser');

var fs = require('fs');
var path = require('path');
var app = express();
var cookieParser = require('cookie-parser');
const session = require('express-session');
//const sqlMock = require('sql-mock');

var exports = module.exports = {};

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(session({
  secret: "qwerty",
  resave:false,
  saveUninitialized:false
}));

var pid ="";
var dbviewCount;
var chartViewCount;
var dbsessionSet = false;
var chartsessionSet = false;
var language;
var sessionLogin = false;

const dataBaseContent = [
  {"pid":"AR077123", "months": 0, "weight": 3},
  {"pid":"AR077123", "months": 1, "weight": 4},
  {"pid":"JK001333", "months": 1, "weight": 3}
];

// // Create connection
// const db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'demo'
// });

// // Connect
// db.connect((err) => {
//   if(err){
//       //console.log("Connection Error");
//       throw err;
//   }
//   console.log('MySql Connected...');
// });

//let db = new sqlMock();

var data = {test:2 };

//set session variables after login operation
app.get('/startSession', function(req, res){
  sessionLogin = true;
  res.redirect("/home");
});

//Destorys session and log's out
app.get('/logout', function(req, res){
  sessionLogin = false;
  req.session.destroy(function(err){
    if(err){
      res.negotiate(err);
    }
  });
  res.redirect("/");
});

//loads homepage (login)
app.get('/', function(req, res){
  res.render('login',{language: language});
});

//called when login is verification check
app.get('/loginVerification/:eid/:password/:language', function(req, res){ 
  language = req.params.language; 
  // let sql = `SELECT COUNT(username) FROM logincredentials WHERE username = "${req.params.eid}" AND password = SHA1 ('${req.params.password}')`;
  // let query = db.query(sql, (err, result) => {
  //     if(err) console.log (err);
  //     countCheck = Object.keys(result[0]).map(function(key) {
  //       return parseInt(result[0][key]);
  //     });
  //     if(countCheck[0]==0)
  //       {
  //         res.json({existing: false});
  //       }
  //     else {
  //         res.json({existing: true});
  //       }       
  // }); 

  res.json({existing: true});
  
});

//redirect to signup page
app.get('/signup/:language', function(req, res){
  language = req.params.language;
  res.render('signup',{language: req.params.language});
});

//Username verification for registration
app.get('/checkuid/:eid', function(req, res){
  // let sql = `SELECT COUNT(username) FROM logincredentials WHERE username = "${req.params.eid}"`;
  // let query = db.query(sql, (err, result) => {
  //     if(err) console.log (err);
  //     countCheck = Object.keys(result[0]).map(function(key) {
  //       return parseInt(result[0][key]);
  //     });
  //     if(countCheck[0] >= 1)
  //       res.json({existing: true});
  //     else
  //       res.json({existing: false});
  //   });
  res.json({existing: true});
});

//registration
app.get('/register/:fname/:lname/:eid/:email/:password', function(req, res){
  // let sql = `INSERT INTO logincredentials (username,password,firstname,lastname,email)
  // VALUES ("${req.params.eid}",SHA1 ('${req.params.password}'),"${req.params.fname}","${req.params.lname}","${req.params.email}")`;
  // let query = db.query(sql, (err, result) => {
  //   if(err) console.log(err);  
  // else 
    res.send("success");    
  // });
});

app.get('/startChartSession', function(req, res){
  chartViewCount = 0;
  chartsessionSet = true;
});

app.get('/startDbSession', function(req, res){
  dbviewCount = 0;
  dbsessionSet = true;
});

app.get('/endSession', function(req, res){
  dbviewCount = 0;
  chartViewCount = 0;
  sessionSet = false;
  chartsessionSet = false;
  req.session.destroy(function(err){
    if(err){
      res.negotiate(err);
    }
  });
  res.redirect("/");
});

app.get('/home', function(req, res){
  if(sessionLogin)
  res.render('index',{isNewPid:false, pid:pid, language: language});
else
  res.redirect("/")
});

app.get('/newPid/:language', function(req, res){
  res.render('index',{isNewPid:true, pid:pid, language: req.params.language});
});

app.get('/data',function(req, res){
  res.json(data);
});

app.get('/language',function(req, res){
  res.send({language:language});  
});

app.get('/index.html', function(req, res){
  chartViewCount +=1;   
    if (chartViewCount >1 || chartsessionSet == false){
      res.redirect("/endSession");
    }
    else
      res.sendFile(__dirname +'/index.html');
});

app.get('/lineData.json', function(req, res){
  var dpath = path.join(__dirname,'./Data', req.url);
  fs.readFile(dpath, (err, json) => {
    let obj = JSON.parse(json);
    res.json(obj);
  });
});

app.get('/render.js', function(req, res){
    //res.status(400);
    res.sendFile(__dirname +'/growthChart.js');
});

app.get('/d3.js', function(req, res){
    var dpath = path.join(__dirname,'./node_modules/d3/dist', req.url);
    res.sendFile(dpath);
});

app.get('/chart/:pid/:language', function(req, res){
  language = req.params.language;
  req.session.pid = req.params.pid;
  //     let sql = `SELECT months, weight FROM test WHERE pid = "${req.params.pid}" ORDER BY months ASC`;
  //     let query = db.query(sql, (err, result) => {
  //         if(err) throw err;
  //         //data = result;  
  //         res.send(err); 
  //     });
  // var response = [];
  //     for( var index =0; index <= dataBaseContent.length; index++){
  //       if(dataBaseContent[index].pid == "${req.params.pid}")
  //       {
  //         response.push({months: dataBaseContent[index].months, weight: dataBaseContent[index].weight})
  //       }
  //     }
  //   console.log(response);
    res.send({months: 12, weight: 12}); 
});

app.get('/db/:pid/:language', function(req, res){
  req.session.pid = req.params.pid;
  dbviewCount +=1;
  req.session.language = req.params.language;
  pid= req.params.pid;   
  if (req.session.pid == pid && dbviewCount >1 || dbsessionSet == false){
    res.redirect("/endSession");
  }
  else
  {
  pid= req.params.pid;
  //var countCheck;
  //let sql = `SELECT COUNT(pid) FROM test WHERE pid = "${req.params.pid}"`;
  // let query = db.query(sql, (err, result) => {
  //     if(err) console.log (err);
  //     countCheck = Object.keys(result[0]).map(function(key) {
  //       return parseInt(result[0][key]);
  //     });
  //     if(countCheck[0]==0)
  //       {
  //         res.redirect("/newPid/"+req.session.language);
  //       }
  //     else {
  //         let sql = `SELECT months, weight FROM test WHERE pid = "${req.params.pid}" ORDER BY months ASC`;
  //         let query = db.query(sql, (err, result) => {
  //             if(err) throw err;
  //             res.render('db',{id: {pid: req.params.pid}, data: result, language: req.session.language });        
  //         });
  //       }       
  // }); 
    result = {months: 12, weight: 12};
  res.render('db',{id: {pid: req.params.pid}, data: result, language: req.session.language });        

}   
});

app.get('/dbOperatorReload', function(req, res){
  dbviewCount -= 1;
});

app.get('/newEntry/:pid/:language', function(req, res){
  req.session.pid = req.params.pid;
  dbviewCount +=1;
  pid= req.params.pid;
  req.session.language = req.params.language;    
  if (req.session.pid == pid && dbviewCount >1 || dbsessionSet == false){
    res.redirect("/endSession");
  }
  else{
    // let sql = `SELECT months, weight FROM test WHERE pid = "${req.params.pid}" ORDER BY months ASC`;
    // let query = db.query(sql, (err, result) => {
    //   if(err) throw err;
    //     res.render('db',{id: {pid: req.params.pid}, data: result, language: req.session.language });        
    // });

    result = {months: 12, weight: 12};
    res.render('db',{id: {pid: req.params.pid}, data: result, language: req.session.language });        
  }
});

// Insert post 1
app.get('/addpost1/:pid/:months/:weight', (req, res) => {
  // let sql = `INSERT INTO test (pid,months,weight) VALUES ("${req.params.pid}",${req.params.months},${req.params.weight})`;
  // let query = db.query(sql, (err, result) => {
  //     if(err) console.log(err);
  //     res.send(err); 
  // });      
  res.send("");   
});

app.get('/update/:pid/:months/:weight', (req, res) => {
  // let sql = `UPDATE test SET weight = ${req.params.weight} WHERE pid = "${req.params.pid}" AND months = ${req.params.months}`;
  // //console.log(sql);
  // let query = db.query(sql, (err, result) => {
  //     if(err) throw err;
  //     res.send(err);
  // });
  res.send("");   
});

app.get('/delete/:pid/:month/:weight', (req, res) => {
  // let sql = `DELETE FROM test WHERE pid = "${req.params.pid}" AND months=${req.params.month}`;
  // let query = db.query(sql, (err, result) => {
  //     if(err) console.log (err);
  //     res.send(err);
  // });
  res.send("");   
});

var server = app.listen(3000, function(){
  console.log('Server running at http://127.0.0.1:3000/ ');
});

// exports.closeServer = function(){
//   server.close();
// };

module.exports = app;