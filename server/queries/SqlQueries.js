
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
    return `SET FOREIGN_KEY_CHECKS=0;`+
      `DROP TABLE IF EXISTS ${this.customers}, ${this.orders}; ` +
      `create table customers(customer_id int not null auto_increment, customer_name char(50) not null, primary key (customer_id));` +
      `create table orders (order_id int not null auto_increment,customer_id int not null,order_date date, item char(200), primary key (order_id));` +
      `alter table orders add foreign key (customer_id) references customers(customer_id);` +
      `SET FOREIGN_KEY_CHECKS=1;`;
  }

  insert_customers(){
    return 'insert into customers (customer_id, customer_name) values ?'
  }

  insert_orders(){
    return 'insert into orders (order_id, customer_id, order_date, item) values ?'
  }
}

module.exports = SqlQueries;
