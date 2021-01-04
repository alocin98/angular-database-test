import {Component, OnInit, ViewChild} from '@angular/core';
import * as mockCustomers from "../../data/customers.json";
import * as mockOrders from "../../data/orders.json";
import {MongodbService} from "../../services/mongodb.service";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-mongo-db',
  templateUrl: './mongo-db.component.html',
  styleUrls: ['./mongo-db.component.scss']
})
export class MongoDBComponent implements OnInit {

  @ViewChild('mongodb') mongodbURI;

  customers: any = (mockCustomers as any).default;
  orders: any = (mockOrders as any).default;

  mongodb: any = {};

  constructor(private db: MongodbService) {
    this.orders.forEach(o => o.date = new Date(o.date));
  }

  ngOnInit(): void {
  }

  resetDB(){
    let time = Date.now();
    this.db.reset().then(() => {
      time = Date.now() - time;
      console.log(time);
    })
  }


  insertCustomers(amount: number) {
    if(amount > 10000){
      alert("Maximum amount of customers is 10'000");
      return;
    }
    let time = Date.now();
    this.db.insertCustomers(this.customers.slice(0,amount)).then((message) => {
      time = Date.now() - time;
      console.log(message);
      console.log(time);
    })
  }

  insertOrders(){
    let time = Date.now();
    this.db.insertOrders(this.orders).then((message) => {
      time = Date.now() - time;
      console.log(message);
      console.log(time);
    })  }

  getCustomersWhoHaveOrdered(item: string) {
    let time = Date.now();
    this.db.getCustomersWhoHaveOrdered(item).then((customers) => {
      console.log(customers);
      time = Date.now() - time;
      console.log(time);
    })
  }

  getOrdersWithin(from: Date, to: Date){
    let time = Date.now();
    this.db.getOrdersWithin(from, to).then((orders) => {
      console.log(orders);
      time = Date.now() - time;
      console.log(time);
    })
  }

  updateCustomerName(id: number, newName: string){
    let time = Date.now();
    this.db.updateCustomer(id, newName).then((customer) => {
      console.log(customer);
      time = Date.now() - time;
      console.log(time);
    })
  }

  deleteOrdersFrom(id: number){
    let time = Date.now();
    this.db.deleteOrdersFrom(id).then((orders) => {
      console.log(orders);
      time = Date.now() - time;
      console.log(time);
    })
  }

  fillTestSrver() {
    this.mongodbURI.nativeElement.value = "mongodb+srv://nicolas:DAd427zKeEYnlIaN@realmcluster.zp3as.mongodb.net/testDatabase?retryWrites=true&w=majority";
  }

  startConnection(value: string) {
    this.db.startConnection(value).then(console.log).catch(console.log);
  }

  endConnection() {
    this.db.endConnection().then(console.log).catch(console.log);
  }
}
