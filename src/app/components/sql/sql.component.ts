import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SqlService } from 'src/app/services/sql.service';
import {Observable} from "rxjs";

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {

  sql: any = {};
  response$: Observable<any>;

  constructor(private sqlService: SqlService) { }

  ngOnInit(): void {
  }

  connectSql(){
    this.response$ = this.sqlService.initialize(this.sql)
  }

  fillTestSrver() {
    this.sql = {
      "user": "i9smnz874w7m60ce",
      "host": "q7cxv1zwcdlw7699.chr7pe7iynqr.eu-west-1.rds.amazonaws.com",
      "password": "egdim89xqbzxnqcg",
      "database": "idpv6c282welyf4s"
    }
  }
}
