
class SqlQueries{
  database = ``

  customers = `customers`
  orders = `orders`
  constructor(database){
    this.database = database;
    this.customers = database + `.` + this.customers;
    this.orders = database + `.` +this.orders;
    this.shipments = database + `.` +this.shipments;
    this.items = database + `.` +this.items;
    this.order_item = database + `.` +this.order_item;
  }

  reset() {
    return `SET FOREIGN_KEY_CHECKS=0;`+
      `DROP TABLE IF EXISTS ${this.customers}, ${this.orders}; ` +
      `create table customers(id int not null auto_increment, name char(50) not null, primary key (id));` +
      `create table orders (id int not null auto_increment,customer_id int not null,date dateTime, item char(200), primary key (id));` +
      `alter table orders add foreign key (customer_id) references customers(id);` +
      `SET FOREIGN_KEY_CHECKS=1;`;
  }

  insert_customers(){
    return `insert into customers (id, name) values ?`
  }

  insert_orders(){
    return `insert into orders (id, date, customer_id, item) values ?`
  }

  getCustomersWhoHaveOrdered(itemId){
    return `select customers.id, customers.name, orders.item from customers ` +
      `join orders on customer_id = customers.id ` +
      `where item = "${itemId}";`
  }

  getOrdersWithin(from, to){
    return `select * from orders where date between "${from}" and "${to}"`;
  }

  updateCustomer(customer){
    return `update customers set name = "${customer.newName}" where id = ${customer.id}`
  }

  deleteOrdersFromCustomer(id){
    return `delete from orders where customer_id = ${id}`
  }
}

module.exports = SqlQueries;
