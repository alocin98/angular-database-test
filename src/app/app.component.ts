import { Component } from '@angular/core';
import {SqlService} from './services/sql.service';
import {tap} from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-database-test';
  sql: any = {};

  constructor(private sqlService: SqlService){
    

  }

  connectSql(){
    this.sqlService.initialize(this.sql).pipe(
      tap(console.log)
    ).subscribe();
  }
}
