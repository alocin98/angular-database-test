import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SqlService {

  BASE_URL = '/api/mysql';

  initializeURL = this.BASE_URL + '/initialize';

  httpConfig = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { }

  initialize(credentials: any){
    return this.http.post(this.initializeURL, credentials, this.httpConfig).pipe(
      catchError(err => throwError(err))
    );
  }
}
