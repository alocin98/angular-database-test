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
  item: String
});

let customer = mongoose.model('Customer', customerSchema);
let order = mongoose.model('Order', orderSchema);

router.get('/', function(req, res, next) {
  res.send('mongodb infos');
});

router.post('/startConnection', function(req, res, next) {
  mongodbURI = req.body.mongodbURI;
  mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then((suc, rej) => {
    if(rej) res.send(rej);
    if(suc) res.send({message: "success"});
  });
});

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
  order.find({item: req.params.itemName}) //.then(items => res.send(items)).catch(err => res.send(err));
    .populate('customer_id', 'name', 'Customer')
    .select('item')
    .exec((err, customers) => {
      if(err) res.send(err.message);
      else res.send(customers);
    });
});

router.post('/getOrdersWithin', function(req, res, next) {
  let from = new Date(req.body["from"]);
  let to = new Date(req.body["to"]);
  order.find({
    date: {
      $gte: from,
      $lt: to
    }
  }).exec((err, orders) => {
    if(err) res.send(err.message);
    else res.send(orders);
  })
});

router.post('/updateCustomer', function(req, res, next) {
  customer.findOneAndUpdate({_id: req.body.id}, {name: req.body.newName}).exec((err, updated) => {
    if(err) res.send(err.message);
    else res.send(updated);
  })
});

router.delete('/deleteOrdersFrom/:customerId', function(req, res, next) {
  order.deleteMany({customer_id: req.params.customerId}).exec((err, deleted) => {
    if(err) res.send(err.message);
    else res.send(deleted);
  })
});

module.exports = router;
