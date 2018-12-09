import { Component, OnInit } from '@angular/core';
import {AuthService} from '../core/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor( private authService: AuthService ) {
    // var user = authService.auth().currentUser;

    firebase.auth().onAuthStateChanged(function (user) {
      // unsubscribe so we don't observe forever
      if (user) {
        //do something
        alert("I'M A FUCKING FAGGOT");
      }
      else { alert('You are not logged in.') } });
    var user = firebase.auth();
    if (user) {
        alert("HAH GAYYYYYYYYYY");
        console.log(user);
    }
    if (authService.user) {
        alert("suck my big fat black gay cock");
    }
    if (user) {
        alert(user);
    } else {
      alert("FUCK YOU");
    }
  }



  ngOnInit() {
    var user = firebase.auth().currentUser;

    if (user) {
        alert("asdfasdf");
    }
  }

  logout() {
    this.authService.signOut();
  }

}
