import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.scss']
})
export class UserUploadComponent implements OnInit {
  ref: any;

  constructor(private afStorage: AngularFireStorage) {

  }
  theUpload: AngularFireList<any>;

  ngOnInit() {
  }

  async upload(event) {
    var file = event.target.files[0];
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child('/uploads').put(file);
    // var uploadTask = storageRef.child('images/mountains.jpg').put(file);

    uploadTask.then((snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    });

    // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, (snapshot)=>{
    //   // upload in progress
    //     var transferredBytes = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    // })
    // this.afStorage.upload('/upload/to/this-path', event.target.files[0]);
    // console.log(event.target.files[0]);
    // create a random id
    // const randomId = Math.random().toString(36).substring(2);
    //   // create a reference to the storage bucket location
    // this.ref = this.afStorage.ref(randomId);
    //   // the put method creates an AngularFireUploadTask
    //   // and kicks off the upload
    // this.task = this.ref.put(event.target.files[0]);
    // this.uploadProgress = this.task.snapshotChanges()
    // .pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));

  }

}
