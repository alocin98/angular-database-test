var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection;

/* GET mysql infos */
router.get('/', function(req, res, next) {
  res.send('mysql infos');
});

/* Initialize SQL Connection */
router.post('/initialize', function(req, res, next) {
  resetConnection();
  const credentials = req.body;
  connection = mysql.createConnection(credentials);
  connection.connect(function(err){
    if(err){
      res.status(400).send("Unable to connect to database. Connection string might be incorrect")
      return;
    }
    res.send('MySQL Server successfully conected with connection string: ' + credentials);
  });
});

router.get('/end', function(req, res, next) {
  resetConnection();
  return res.send("")
});

function resetConnection() {
  if(this.connection){
    this.connection.end();
  }
}

function testConnection() {
  connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });
}

router.get('')

module.exports = router;
