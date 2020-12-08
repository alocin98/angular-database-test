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

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'customer',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } }
    ]
  }]
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
