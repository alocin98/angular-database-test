import { Component, OnInit } from '@angular/core';
import {IndexedDbService} from '../../services/indexed-db.service';
import * as mockCustomers from "../../data/customers.json";
import * as mockOrders from "../../data/orders.json";

@Component({
  selector: 'app-indexed-db',
  templateUrl: './indexed-db.component.html',
  styleUrls: ['./indexed-db.component.scss']
})
export class IndexedDBComponent implements OnInit {
  customers: any = (mockCustomers as any).default;
  orders: any = (mockOrders as any).default;

  constructor(private indexedDB: IndexedDbService) {
    this.orders.forEach(o => o.date = new Date(o.date));
  }

  ngOnInit(): void {
  }

  reset(){
    this.indexedDB.reset();
  }


  insertCustomers(amount: number) {
    if(amount > 10000){
      alert("Maximum amount of customers is 10'000");
      return;
    }
    let time = Date.now();
    this.indexedDB.insertCustomers(this.customers.slice(0,amount)).then(() => {
      time = Date.now() - time;
      console.log(time);
    })
  }

  insertOrders(){
    let time = Date.now();
    this.indexedDB.insertOrders(this.orders).then(() => {
      time = Date.now() - time;
      console.log(time);
    })  }

  getCustomersWhoHaveOrdered(item: string) {
    let time = Date.now();
    this.indexedDB.getCustomersWhoHaveOrdered(item).then((customers) => {
      console.log(customers);
      time = Date.now() - time;
      console.log(time);
    })
  }

  getOrdersWithin(from: Date, to: Date){
    let time = Date.now();
    this.indexedDB.getOrdersWithin(from, to).then((orders) => {
      console.log(orders);
      time = Date.now() - time;
      console.log(time);
    })
  }

  updateCustomerName(id: number, newName: string){
    let time = Date.now();
    this.indexedDB.updateCustomer(id, newName).then((customer) => {
      console.log(customer);
      time = Date.now() - time;
      console.log(time);
    })
  }

  deleteOrdersFrom(id: number){
    let time = Date.now();
    this.indexedDB.deleteOrdersFrom(id).then((orders) => {
      console.log(orders);
      time = Date.now() - time;
      console.log(time);
    })
  }
}
