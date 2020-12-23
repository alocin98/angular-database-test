var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var SqlQueries = require('../queries/SqlQueries')
var connection;
var credentials;
var Q = require('q');


var queries = new SqlQueries('idpv6c282welyf4s');

/* GET mysql infos */
router.get('/', function(req, res, next) {
  res.send('mysql infos');
});

/* Initialize SQL Connection */
router.post('/initialize', function(req, res, next) {
  resetConnection();
  credentials = req.body;
  credentials.multipleStatements = true;
  connection = mysql.createConnection(credentials);
  connection.connect(function(err){
    if(err){
      res.status(400).send({"message":"Unable to connect to database. Connection string might be incorrect"})
      return;
    }
    connection.end((error) => {res.send(JSON.stringify(connection.config));})
  });
});

router.get('/reset', function(req, res, next) {
  let connection = mysql.createConnection(credentials);
  connection.connect();
  connection.query(queries.reset(), function (error, results, fields) {
    if (error) return res.send(error);
    return res.send(results.message)
  })
  connection.end();
})

router.post('/customers/insert', function(req, res, next) {
  let customers = req.body.map(c => Object.values(c));
  let connection = mysql.createConnection(credentials);
  console.log(customers);

  connection.query(queries.insert_customers(), [customers],(error, results, fields) => {
    if(error){
      res.send(error);
    } else {
      res.send(results.message);
    }
  });

  connection.end();

});

router.post('/orders/insert', function(req, res, next) {
  let orders = req.body.map(c => Object.values(c));
  let connection = mysql.createConnection(credentials);

  connection.query(queries.insert_orders(), [orders],(error, results, fields) => {
    if(error){
      res.send(error);
    } else {
      res.send(results.message);
    }
  });

  connection.end();
});

router.post('/query', function(req, res, next){
  let connection = mysql.createConnection(credentials);
  if(req.body.key !== 'ffhsta2020'){
    res.send("unauthorized");
    return;
  }
  connection.query(req.body.query, (error, results, fields) => {
    if(error){
      res.send(error.message);
    } else {
      res.send(results);
    }
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

router.get('')

module.exports = router;
