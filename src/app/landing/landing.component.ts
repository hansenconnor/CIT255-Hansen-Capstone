import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../core/auth.service';

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
  users: Observable<any>;
  constructor(db: AngularFirestore, private _authService: AuthService) {
    // db = firebase.firestore();
    // db.settings({ timestampsInSnapshots: true });
    // this.items = this.db.collection('shots');

    // this.shots = db.collection('shots').valueChanges();
    this.shots = db.collection('shots').valueChanges();

    // this.db.database.list('users', { preserveSnapshot: true})
    // .subscribe(snapshots=>{
    //     snapshots.forEach(snapshot => {
    //       console.log(snapshot.key, snapshot.val());
    //     });
    // })

    // db.collection('users').ref.get()
    //
    // this.users = _authService.getUsers()
    //  .valueChanges()
    //
    //  this.users.subscribe((users)=>{
    //    console.log(users);
    //    _authService.getAllUserPosts(users);
    //  });
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
