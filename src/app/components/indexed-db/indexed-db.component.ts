import { Component, OnInit } from '@angular/core';
import {IndexedDbService} from '../../services/indexed-db.service';

@Component({
  selector: 'app-indexed-db',
  templateUrl: './indexed-db.component.html',
  styleUrls: ['./indexed-db.component.scss']
})
export class IndexedDBComponent implements OnInit {

  constructor(private indexedDB: IndexedDbService) { }

  ngOnInit(): void {
  }

  resetDB(){
    this.indexedDB.resetDB();
  }


}
