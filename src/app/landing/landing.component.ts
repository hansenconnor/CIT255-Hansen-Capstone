import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  // constructor(private database: AngularFireDatabase) {
  //   this.shots = database.list('shots');
  // }
  items: Observable<any[]>;
  constructor( db: AngularFirestore ) {
    this.items = db.collection('shots').valueChanges();
  }

  ngOnInit() {
  }

}
