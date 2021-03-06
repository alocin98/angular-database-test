import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IBenchmark} from '../../core/IBenchmark';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {Customer, InsertData, Order} from "../../core/Interfaces";
import {json} from "express";

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  BASE_URL = '/api/mysql';

  credentials: any;

  httpConfig = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    })
  }

  constructor(private http: HttpClient) { }

  initialize(credentials: any){
    this.credentials = credentials;
    return this.http.post(this.BASE_URL + '/initialize', credentials, this.httpConfig);
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
