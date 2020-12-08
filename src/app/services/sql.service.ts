import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {IBenchmark} from '../../core/IBenchmark';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SqlService implements IBenchmark {

  BASE_URL = '/api/mysql';

  initializeURL = this.BASE_URL + '/initialize';

  httpConfig = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }
  resetDB() {
    throw new Error('Method not implemented.');
  }
  testInserts() {
    throw new Error('Method not implemented.');
  }
  testReads() {
    throw new Error('Method not implemented.');
  }
  testQueries() {
    throw new Error('Method not implemented.');
  }

  initialize(credentials: any){
    return this.http.post(this.initializeURL, credentials, this.httpConfig).pipe(
      catchError(err => throwError(err))
    );
  }
}
