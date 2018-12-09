import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import * as firebase from 'firebase';
import { Router  , ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profileImageUrl;
  user;
  task: any;
  ref: import("/Users/Connor/documents/projects/plvstikAngular/plvstik-app/node_modules/@angular/fire/storage/ref").AngularFireStorageReference;
  uploadProgress: any;
  constructor(authService: AuthService, private route: ActivatedRoute, private afStorage: AngularFireStorage) {
    this.user = firebase.auth().currentUser;
    console.log("user:" + this.user);
    console.log("imageurl: " + firebase.auth().currentUser.photoURL);
    if (firebase.auth().currentUser.photoURL == null) {
        this.profileImageUrl = "../assets/upload-profile-placeholder@2x.png"
    }
  }

  upload(event) {
    // this.afStorage.upload('/upload/to/this-path', event.target.files[0]);
    console.log(event.target.files[0]);
    // create a random id
  const randomId = Math.random().toString(36).substring(2);
//   // create a reference to the storage bucket location
  this.ref = this.afStorage.ref(randomId);
//   // the put method creates an AngularFireUploadTask
//   // and kicks off the upload
// this.task = this.ref.put(event.target.files[0]);
// this.uploadProgress = this.task.snapshotChanges()
// .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
  }

  ngOnInit() {
    console.log("username: " + this.route.snapshot.params['username']);
  }

}
