import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as firebase from 'firebase';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import {AuthService} from './core/auth.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { environment } from '../environments/environment';
import { RegisterComponent } from './register/register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

firebase.initializeApp(environment.firebase);
firebase.auth().onAuthStateChanged(function(user) {
  alert(user);
  if (user) {
    alert(user.uid);
    this.isLoggedIn = true;
     // User is signed in.
     this.displayName = user.displayName;
     this.email = user.email;
     this.emailVerified = user.emailVerified;
     this.photoURL = user.photoURL;
     this.isAnonymous = user.isAnonymous;
     this.uid = user.uid;
     this.providerData = user.providerData;
     // ...
   } else {
     // User is signed out.
     // ...
     // this.user = false;
   }
});
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    UserLoginComponent,
    RegisterComponent,
    UserProfileComponent,
  ],
  imports: [
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
