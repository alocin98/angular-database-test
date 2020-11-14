import { Component } from '@angular/core';
import {SqlService} from './services/sql.service';
import {tap} from 'rxjs/operators';
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-database-test';
  sql: any = {};
  sqlConnectionResponse$: Observable<any>;

  constructor(private sqlService: SqlService){


  }

  connectSql(){
    this.sqlConnectionResponse$ = this.sqlService.initialize(this.sql);
  }
}
