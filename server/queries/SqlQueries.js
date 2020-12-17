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
      `create table customers(customer_id int not null auto_increment, customer_name char(50) not null,primary key (customer_id));` +
      `create table items(item_id int not null auto_increment,item_name char(50) not null,price float not null,primary key (item_id));` +
      `create table shipments(shipment_id int not null auto_increment,order_id int not null,shipment_date date not null,primary key (shipment_id));` +
      `create table orders (order_id int not null auto_increment,customer_id int not null,order_date date,primary key (order_id));` +
      `create table order_item (order_id int not null, item_id int not null);` +
      `alter table orders add foreign key (customer_id) references customers(customer_id);` +
      `alter table shipments add foreign key (order_id) references orders(order_id);` +
      `alter table order_item add foreign key (order_id) references orders(order_id);`+
      `alter table order_item add foreign key (item_id) references items(item_id);`;
  }

  create_customers(){
    return 'insert into customers (customer_name) values ?'
  }

  create_items(){
    return 'insert into items (item_name, price) values ?'
  }

  create_orders(){
    return 'insert into orders (item_name, price) values ?'
  }

  create_shipments(){

  }
}

module.exports = SqlQueries;
