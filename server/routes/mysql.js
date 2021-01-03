var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var SqlQueries = require('../queries/SqlQueries')
var connection;
var credentials;
var dateFormat = require("dateformat");


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
  console.log("reset");
  connection.connect();
  connection.query(queries.reset(), function (error, results, fields) {
    if (error) return res.send(error);
    return res.send(results.message)
  })
  connection.end();
})

router.put('/insertCustomers', function(req, res, next) {
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

router.put('/insertOrders', function(req, res, next) {
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

router.get('/getCustomersWhoHaveOrdered/:itemId', function(req, res, next) {
  let connection = mysql.createConnection(credentials);
  let itemId = req.params.itemId;

  connection.query(queries.getCustomersWhoHaveOrdered(itemId), (error, results, fields)  => {
    if (error){
      res.send(error);
    } else {
      res.send(results);
    }
  });

  connection.end();
});

router.post('/getOrdersWithin', function(req, res, next) {
  let connection = mysql.createConnection(credentials);
  let from = new Date(req.body["from"]);
  let to = new Date(req.body["to"]);

  connection.query(queries.getOrdersWithin(dateFormat(from, "yyyy-mm-dd"), dateFormat(to, "yyyy-mm-dd")), (error, results, fields)  => {
    if (error){
      res.send(error);
    } else {
      res.send(results);
    }
  });

  connection.end();
});

router.post('/updateCustomer', function(req, res, next) {
  let connection = mysql.createConnection(credentials);

  connection.query(queries.updateCustomer(req.body), (error, results, fields)  => {
    if (error){
      res.send(error);
    } else {
      res.send(results);
    }
  });

  connection.end();
});

router.delete('/deleteOrdersFrom/:customerId', function(req, res, next) {
  let connection = mysql.createConnection(credentials);

  connection.query(queries.deleteOrdersFromCustomer(req.params.customerId), (error, results, fields)  => {
    if (error){
      res.send(error);
    } else {
      res.send(results);
    }
  });

  connection.end();
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

router.get('')

module.exports = router;
