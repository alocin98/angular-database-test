var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var SqlQueries = require('../queries/SqlQueries')
var connection;
var credentials;
var dateFormat = require("dateformat");
const mongoose = require('mongoose');

let mongodbURI = "";
let customerSchema = new mongoose.Schema({
  _id: Number,
  name: String
});

let orderSchema = new mongoose.Schema({
  _id: Number,
  date: Date,
  customer_id: Number,
  items: String
});

let customer = mongoose.model('Customer', customerSchema);
let order = mongoose.model('Order', orderSchema);

/* GET mysql infos */
router.get('/', function(req, res, next) {
  res.send('mongodb infos');
});

/* Initialize SQL Connection */
router.post('/startConnection', function(req, res, next) {
  mongodbURI = req.body.mongodbURI;
  mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((suc, rej) => {
    if(rej) res.send(rej);
    if(suc) res.send({message: "success"});
  });
});

/* Initialize SQL Connection */
router.get('/endConnection', function(req, res, next) {
  mongoose.disconnect().then((suc, rej) => {
    if(rej) res.send(rej);
    if(suc) res.send({message: "success"});
  });
});

router.get('/reset', function(req, res, next) {
  mongoose.connection.db.dropDatabase().then((suc, rej) => {
    if(rej) res.send(rej);
    if(suc) {
      Promise.all([customer.createCollection(), order.createCollection()]).then(values => res.send({message: "successfully reseted db"})).catch(err => res.send(err));
    }
  });
})

router.put('/insertCustomers', function(req, res, next) {
  let customers = req.body;
  customers.forEach(c => {
    c._id = c.id;
    delete c.id;
  });
  customer.insertMany(customers).then(() => res.send({message: "Successfully inserted customers"})).catch(err => res.send(err));
});

router.put('/insertOrders', function(req, res, next) {
  let orders = req.body;
  orders.forEach(o => {
    o._id = o.id;
    delete o.id;
  })
  console.log(orders.find(c => c.customer_id === 624));
  order.create(orders).then(() => res.send({message: "Successfully inserted orders"})).catch(err => res.send(err));
});

router.get('/getCustomersWhoHaveOrdered/:itemName', function(req, res, next) {
  Order.find({item: req.params.itemName}).then((res, err) => res.send(res));
  /*
    .populate('customer_id')
    .exec((err, users) => {
      if(err) res.send(err.message);
      res.send(users);
    });
   */
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
