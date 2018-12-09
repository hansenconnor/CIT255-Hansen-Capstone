import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
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
  db;
  shots: Observable<any>;
  constructor(db: AngularFirestore) {
    // db = firebase.firestore();
    // db.settings({ timestampsInSnapshots: true });
    // this.items = this.db.collection('shots');

    this.shots = db.collection('shots').valueChanges();
  }

  // displayShots(){
  //   var docRef = this.db.collection("users").doc(currUserId);
  //   docRef.get().then(function(doc){
  //     if (doc.exists) {
  //       username = doc.username;
  //       console.log("Document data:", doc.data());
  //     } else {
  //         username = '/';
  //         // doc.data() will be undefined in this case
  //         console.log("No such document!");
  //     }
  //   });
  // }

  ngOnInit() {
  }

}
