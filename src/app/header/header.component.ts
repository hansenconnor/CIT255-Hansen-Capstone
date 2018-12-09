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
        alert("User exists");
      }
      else { alert('You are not logged in.') }
    });
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
