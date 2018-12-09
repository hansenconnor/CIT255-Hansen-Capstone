import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
// import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  // user: any = null;
  user: any = null;
  db;
  displayName;
  email;
  emailVerified;
  photoURL;
  isAnonymous;
  uid;
  providerData;

  constructor(private router: Router) {
    this.db = firebase.firestore();
    this.db.settings({ timestampsInSnapshots: true }); //
    // this.afAuth.user.subscribe((auth) => {
    //   this.user = auth
    // });
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
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
       }
    });
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.user !== null) ? this.user.isAnonymous : false
  }

  get currentUserId() {
    return (this.user !== null) ? this.user.uid : ''
  }

  get currentUserEmail(): string {
    return this.user['email']
  }

  get currentUsername() {
    var username;
    var currentUser = firebase.auth().currentUser;
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

  get currentUser(): any {
    return (this.user !== null) ? this.user : null;
  }

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
      const user = firebase.auth().signInWithEmailAndPassword(email, password).then( ()=> {
        this.user = user;
      });
    }
    catch (error) {
      console.log(error);
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
    firebase.auth().signOut();
    this.router.navigate(['/'])
  }
}
