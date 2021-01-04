import { Injectable } from '@angular/core';
import { IBenchmark } from 'src/core/IBenchmark';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import {Generator} from '../../core/Generator';
import {createTransaction} from "ngx-indexed-db/utils";
import {promises} from "dns";
import {flatMap, map, mergeMap, switchMap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  constructor(private dbService: NgxIndexedDBService) {

  }
  reset() {
    this.dbService.clear("customers");
    this.dbService.clear("orders");
  }

  insertCustomers(customers: any[]): Promise<any> {
    return new Promise((resolve) => {
      customers.forEach(c => this.dbService.add("customers", c));
      resolve();
    });
  }

  insertOrders(orders: any[]): Promise<any> {
    return new Promise((resolve) => {
      orders.forEach(o => this.dbService.add("orders", o));
      resolve();
    });
  }

  getCustomersWhoHaveOrdered(item: string): Promise<any>{
    return this.dbService.getAllByIndex('orders', 'item', IDBKeyRange.only(item)).pipe(
      map((orders, index) => {
        const customers = [];
        orders.forEach(o => this.dbService.getByKey('customers', o.customer_id).toPromise().then(c => customers.push(c)));
        return customers;
      }
    )).toPromise();
  }

  getOrdersWithin(from: Date, to: Date): Promise<any>{
    return this.dbService.getAllByIndex('orders', 'date', IDBKeyRange.bound(from, to)).toPromise();
  }

  updateCustomer(id: number, newName: string): Promise<any>{
    return this.dbService.update('customers', {id: id, name: newName}).toPromise();
  }

  deleteOrdersFrom(id: number): Promise<any>{
    return this.dbService.getAllByIndex('orders', 'customer_id', IDBKeyRange.only(id)).pipe(
      map((orders, index) => {
        const deleted = [];
        orders.forEach(o => this.dbService.delete('orders', o.id).toPromise().then(o => deleted.push(o)));
        return deleted;
      })
    ).toPromise();
  }

}
