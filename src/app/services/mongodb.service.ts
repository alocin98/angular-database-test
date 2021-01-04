import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Customer, Order} from "../../core/Interfaces";

@Injectable({
  providedIn: 'root'
})
export class MongodbService {


  BASE_URL = '/api/mongodb';

  credentials: any;

  httpConfig = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  startConnection(mongodbURI: any){
    return this.http.post(this.BASE_URL + '/startConnection', {mongodbURI: mongodbURI}, this.httpConfig).toPromise();
  }

  endConnection() {
    return this.http.get(this.BASE_URL + '/endConnection', this.httpConfig).toPromise();
  }

  reset(): Promise<any> {
    return this.http.get(this.BASE_URL + '/reset', this.httpConfig).toPromise();
  }

  insertCustomers(customers: Customer[]): Promise<any>{
    return this.http.put(this.BASE_URL + '/insertCustomers', JSON.stringify(customers), this.httpConfig).toPromise();
  }

  insertOrders(orders: Order[]): Promise<any>{
    return this.http.put(this.BASE_URL + '/insertOrders', JSON.stringify(orders), this.httpConfig).toPromise();
  }

  getCustomersWhoHaveOrdered(item: string): Promise<any>{
    return this.http.get(this.BASE_URL + '/getCustomersWhoHaveOrdered/' + item, this.httpConfig).toPromise();
  }

  getOrdersWithin(from: Date, to: Date): Promise<any>{
    return this.http.post(this.BASE_URL + '/getOrdersWithin',{from: from, to: to}, this.httpConfig).toPromise();
  }

  updateCustomer(id: number, newName: string): Promise<any>{
    return this.http.post(this.BASE_URL + '/updateCustomer', {id: id, newName: newName}).toPromise();
  }

  deleteOrdersFrom(id: number): Promise<any>{
    return this.http.delete(this.BASE_URL + '/deleteOrdersFrom/' + id, this.httpConfig).toPromise();
  }

}
