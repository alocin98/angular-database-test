import { Component, OnInit } from '@angular/core';
import {catchError, tap} from 'rxjs/operators';
import { SqlService } from 'src/app/services/sql.service';
import {Observable} from "rxjs";
import {Generator} from "../../../core/Generator";
import {InsertData} from "../../../core/Interfaces";
import * as mockCustomers from "../../data/customers.json";
import * as mockOrders from "../../data/orders.json";
import {IndexedDbService} from "../../services/indexed-db.service";

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {
  customers: any = (mockCustomers as any).default;
  orders: any = (mockOrders as any).default;

  sql: any = {};

  constructor(private db: SqlService) {
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
    this.db.insertCustomers(this.customers.slice(0,amount)).then(() => {
      time = Date.now() - time;
      console.log(time);
    })
  }

  insertOrders(){
    let time = Date.now();
    this.db.insertOrders(this.orders).then(() => {
      time = Date.now() - time;
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
    this.sql = {
      "user": "i9smnz874w7m60ce",
      "host": "q7cxv1zwcdlw7699.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
      "password": "egdim89xqbzxnqcg",
      "database": "idpv6c282welyf4s"
    }
  }

  connectSql(){
    this.db.initialize(this.sql).pipe(
      catchError(err => {
        console.log(err)
        return err.error.message;
      })
    ).toPromise().then(console.log);

  }
}
