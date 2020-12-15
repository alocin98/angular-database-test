class SqlQueries{
  database = ``

  customers = 'customers'
  orders = 'orders'
  shipments = 'shipments'
  items = 'items'
  order_item = 'order_item'
  constructor(database){
    this.database = database;
    this.customers = database + '.' + this.customers;
    this.orders = database + '.' +this.orders;
    this.shipments = database + '.' +this.shipments;
    this.items = database + '.' +this.items;
    this.order_item = database + '.' +this.order_item;

  }

  reset() {
    return `DROP TABLE IF EXISTS ${this.customers}, ${this.orders}, ${this.shipments}, ${this.items}, ${this.order_item}; ` +
      `create table Customers(customer_id int not null, customer_name char(50) not null, constraint Customers_pk primary key (customer_id));` +
      `create table items(item_id int not null,item_name char(50) not null,price float not null,constraint items_pk primary key (item_id));` +
      ``;
  }
}

module.exports = SqlQueries;
