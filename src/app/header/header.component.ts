import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  user;
  userID;
  public username: string;
  public chad: string;
  // myUser: Observable<firebase.User>;
  public myUser;
  constructor( private authService: AuthService ) {
    // firebase.auth().onAuthStateChanged((user) => { this.user = user; })
    // var user = authService.auth().currentUser;
    this.authService.myUser.subscribe(user => console.log(user));
    // this.myUser = this.authService.userStatus();
    this.user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged((user) =>{
      this.myUser = user;
      // alert(this.myUser.displayName);
      this.username = authService.currentUsername;
      // authService.currentUsername.((response)=>{
      //   console.log("response:" + response);
      //
      // });
      console.log("username: " + authService.currentUsername);
    });

    // firebase.auth().onAuthStateChanged(function (user) {
    //   // unsubscribe so we don't observe forever
    //   if (user != null) {
    //     alert("Have a user!");
    //     //do something
    //     alert("The user id is: " + user.uid);
    //     this.user = firebase.auth().currentUser;
    //     this.userID = user.uid;
    //     console.log(this.userID);
    //     // alert(this.user.uid);
    //     // alert("User exists");
    //   }
    //   else { alert('You are not logged in.') }
    // });
    // console.log("FIRE: " + firebase.auth().currentUser);
  }

  get currentUsername() {
    var currentUser = firebase.auth().currentUser;
    var currUserId = currentUser.uid;
    var docRef = this.authService.db.collection("users").doc(currUserId);
    var username = docRef.get().then(function(doc){
      if (doc.exists) {
        // this.username = doc.username;
        console.log("Document data:", doc.data());
        var doc = doc.data();
        console.log(doc['username']);
        return doc['username'];
      } else {
          console.log("No such document!");
          return '/';
          // doc.data() will be undefined in this case
      }
    });
    return username;
  }

  ngOnInit() {}

  logout() {
    this.authService.signOut();
  }

}
