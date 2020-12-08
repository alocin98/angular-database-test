import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { SqlService } from 'src/app/services/sql.service';

@Component({
  selector: 'app-sql',
  templateUrl: './sql.component.html',
  styleUrls: ['./sql.component.scss']
})
export class SqlComponent implements OnInit {

  sql: any = {};

  constructor(private sqlService: SqlService) { }

  ngOnInit(): void {
  }

  connectSql(){
    this.sqlService.initialize(this.sql).pipe(
      tap(console.log)
    ).subscribe();
  }

}
