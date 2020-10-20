import { Component } from '@angular/core';
const mysql = require('mysql2');
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-database-test';
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'test'
  });
  //mysql = new MysqlConnection();

  constructor(){


  }
}
