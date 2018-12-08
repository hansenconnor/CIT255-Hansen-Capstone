import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {

  authState: any = null;

  constructor(private afAuth: AngularFireAuth, private router: Router, private db: AngularFirestore) {
    db.firestore.settings({ timestampsInSnapshots: true }); //
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }

  get isUserAnonymousLoggedIn(): boolean {
    return (this.authState !== null) ? this.authState.isAnonymous : false
  }

  get currentUserId(): string {
    return (this.authState !== null) ? this.authState.uid : ''
  }

  get currentUserName(): string {
    return this.authState['email']
  }

  get currentUser(): any {
    return (this.authState !== null) ? this.authState : null;
  }

  get isUserEmailLoggedIn(): boolean {
    if ((this.authState !== null) && (!this.isUserAnonymousLoggedIn)) {
      return true
    } else {
      return false
    }
  }

  signUpWithGmail(){

  }

  async signUpWithEmail(email: string, password: string) {
    try {
      const user = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      this.authState = user;
      this.addUserToDatabase();
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  async loginWithEmail(email: string, password: string) {
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.authState = user;
    }
    catch (error) {
      console.log(error);
      throw error;
    }
  }

  addUserToDatabase() {
    var user = firebase.auth().currentUser;
    alert(user.uid);
    const collection = this.db.collection("users")
        collection.doc(user.uid).set({
            uid : user.uid,
            first: "Connor",
            last: "Hansen"
        }).then(()=>{
            console.log("done")
        })
  }

  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
  }
}
