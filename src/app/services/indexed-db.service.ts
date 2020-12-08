import { Injectable } from '@angular/core';
import { IBenchmark } from 'src/core/IBenchmark';
import { NgxIndexedDBService, ObjectStoreMeta } from 'ngx-indexed-db';
import {Generator} from '../../core/generator';


@Injectable({
  providedIn: 'root'
})
export class IndexedDbService implements IBenchmark {

  storeSchema: ObjectStoreMeta = {
    store: 'customer',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } }
    ],
  }
  constructor(private dbService: NgxIndexedDBService) {

  }
  resetDB() {
    this.dbService.deleteDatabase();
    this.dbService.createObjectStore(this.storeSchema);
  }
  testInserts() {
    return this.dbService.add('customer', {name: Generator.getName()});
  }
  testReads() {
    return this.dbService.getAll('customer');
  }
  testQueries() {
    throw new Error('Method not implemented.');
  }
}
