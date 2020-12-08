import { Component } from '@angular/core';
import {SqlService} from './services/sql.service';
import {tap} from 'rxjs/operators';
import {Observable} from "rxjs";
import{Generator} from '../core/generator';
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
    alert(Generator.getName());
  }

  connectSql(){
    this.sqlConnectionResponse$ = this.sqlService.initialize(this.sql);
  }
}
