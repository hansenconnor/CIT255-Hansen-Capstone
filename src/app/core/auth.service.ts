import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
// import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  // user: any = null;
  isLoggedIn;
  user: any = null;
  db;
  displayName;
  email;
  emailVerified;
  photoURL;
  isAnonymous;
  uid;
  providerData;

  constructor(private router: Router, private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => console.log(user));
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true }); //
    // this.afAuth.user.subscribe((auth) => {
    //   this.user = auth
    // });
    // afAuth.auth.onAuthStateChanged(function(user) {
    //   alert(user);
    //   if (user) {
    //     alert(user.uid);
    //     this.isLoggedIn = true;
    //      // User is signed in.
    //      this.displayName = user.displayName;
    //      this.email = user.email;
    //      this.emailVerified = user.emailVerified;
    //      this.photoURL = user.photoURL;
    //      this.isAnonymous = user.isAnonymous;
    //      this.uid = user.uid;
    //      this.providerData = user.providerData;
    //      // ...
    //    } else {
    //      // User is signed out.
    //      // ...
    //      // this.user = false;
    //    }
    // });
  }

  currentUser(){
    // var user = "this.afAuth.auth.currentUser";
    // if (user) {
    //     return true;
    // } else {
    //   return false;
    // }
    return this.afAuth.auth.currentUser;
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.user !== null) ? this.user.isAnonymous : false
  }

  get currentUserId() {
    // return (this.user !== null) ? this.user.uid : ''
    return this.uid;
  }

  get currentUserEmail(): string {
    return this.user['email']
  }

  get currentUsername() {
    var username = '';
    var currentUser = this.afAuth.auth.currentUser;
    var currUserId = currentUser.uid;
    var docRef = this.db.collection("users").doc(currUserId);
    docRef.get().then(function(doc){
      if (doc.exists) {
        username = doc.username;
        console.log("Document data:", doc.data());
      } else {
          username = '/';
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
    });
    return username;
  }

  // currentUser() {
  //   var user = firebase.auth().currentUser;
  //
  //   if (user) {
  //     // User is signed in.
  //     return true;
  //   } else {
  //     // No user is signed in.
  //     return false;
  //   }
  // }

  get isUserEmailLoggedIn(): boolean {
    if ((this.user !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  signUpWithGmail(){

  }

  async signUpWithEmail(email: string, password: string) {
    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      this.user = user;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      this.afAuth.auth.signInWithEmailAndPassword(email, password).then((user)=>{
        this.user = this.afAuth.authState;
      });
      alert("Success!");
    }
    catch (error) {

      alert(error);
      throw error;
    }
  }

  addUserToDatabase(name, username) {
    var user = firebase.auth().currentUser;
    var collection = this.db.collection("users")
        collection.doc(user.uid).set({
            uid : user.uid,
            name: name,
            username: username
        }).then(()=>{
            console.log("done")
        })
  }

  signOut(): void {
    // firebase.auth().signOut();
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }
}
