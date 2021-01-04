import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SqlComponent } from './components/sql/sql.component';
import { IndexedDBComponent } from './components/indexed-db/indexed-db.component';
import { MongoDBComponent } from './components/mongo-db/mongo-db.component';
import {DBConfig, NgxIndexedDBModule} from "ngx-indexed-db";

export function migrationFactory() {
  return {
    1: (db, transaction) => {
      const customers = transaction.objectStore('customers');
      const orders = transaction.objectStore('orders');
      customers.createIndex('id', 'id', { unique: false });
      orders.createIndex('date', 'date', { unique: false });
      orders.createIndex('item', 'item', { unique: false });
      orders.createIndex('customer_id', 'customer_id', {unique: false});
    }
  };
}

const dbConfig: DBConfig  = {
  name: 'MyDatabase',
  version: 1,
  objectStoresMeta: [{
    store: 'customers',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } }
    ]
  },{
    store: 'orders',
    storeConfig: { keyPath: 'id', autoIncrement: false },
    storeSchema: [
      { name: 'customer_id', keypath: 'customer_id', options: { unique: false } },
      { name: 'date', keypath: 'date', options: { unique: false } },
      { name: 'item', keypath: 'item', options: {unique: false} }
    ]
  }],
  migrationFactory
};

@NgModule({
  declarations: [
    AppComponent,
    SqlComponent,
    IndexedDBComponent,
    MongoDBComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
