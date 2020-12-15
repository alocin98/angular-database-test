var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var SqlQueries = require('../queries/SqlQueries')
var connection;

var queries = new SqlQueries('idpv6c282welyf4s');

/* GET mysql infos */
router.get('/', function(req, res, next) {
  res.send('mysql infos');
});

/* Initialize SQL Connection */
router.post('/initialize', function(req, res, next) {
  resetConnection();
  const credentials = req.body;
  credentials.multipleStatements = true;
  connection = mysql.createConnection(credentials);
  connection.connect(function(err){
    if(err){
      res.status(400).send({"message":"Unable to connect to database. Connection string might be incorrect"})
      return;
    }
    res.send(JSON.stringify(connection.config));
  });
});

router.get('/reset', function(req, res, next) {
  return connection.query(queries.reset(), function (error, results, fields) {
    if (error) return res.send(error);
    return res.send("successful")
  })
})

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
