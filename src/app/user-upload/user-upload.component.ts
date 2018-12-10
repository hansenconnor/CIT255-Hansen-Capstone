import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseStorage, FirebaseApp } from 'angularfire2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.scss']
})
export class UserUploadComponent implements OnInit {

  // Class variables
  ref: any;
  successMessage:string;
  errorMessage = '';
  title = '';
  tags = '';
  description = '';
  file: File;
  error: { title: string, tags: string, description: string } = {title: '', tags: '', description: ''};
  storage : any;
  theTask;
  db;
  uploadProgress: {percentage: number} = {percentage: 0};
  // progress: {percentage: number} = {percentage: 0}

  constructor(private afd: AngularFireDatabase, fbApp: FirebaseApp) {
    this.storage = fbApp.storage();
    this.ref = fbApp.database().ref();
    this.db = fbApp.database();
  }

  ngOnInit() {}

  async upload(event) {
    var file = event.target.files[0];
    this.file = file;
    var storageRef = firebase.storage().ref();
    var displayName = firebase.auth().currentUser.displayName;
    this.theTask = storageRef.child('/uploads/' + displayName + '/' + this.file.name).put(this.file);
    this.theTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        // this.uploadProgress = snap.bytesTransferred;
        console.log(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
        // this.uploadProgress = snapshot.pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
        // progress.uploadProgress = 2;
        this.uploadProgress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)
      },
      () => {
        // success
        // fileUpload.url = uploadTask.snapshot.downloadURL
        // fileUpload.name = fileUpload.file.name
        // this.saveFileData(fileUpload)
      }
    );
    // var storageRef = firebase.storage().ref();
    // var displayName = firebase.auth().currentUser.displayName;
    // var uploadTask = storageRef.child('/uploads/' + displayName + '/' + file.name).put(file);
    // var uploadTask = storageRef.child('images/mountains.jpg').put(file);

    // uploadTask.then((snapshot) => {
    //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    // });

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

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { title: '', tags: '', description: '' };
  }

  onSubmitPost(): void {
    this.clearErrorMessage();
    if (this.validateForm(this.title, this.tags, this.description)) {
      var storageRef = firebase.storage().ref();
      var displayName = firebase.auth().currentUser.displayName;
      this.theTask = storageRef.child('/uploads/' + displayName + '/' + this.file.name).put(this.file);
      this.theTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          const snap = snapshot as firebase.storage.UploadTaskSnapshot;
          // this.uploadProgress = snap.bytesTransferred;
          console.log(Math.round((snap.bytesTransferred / snap.totalBytes) * 100));
          // this.uploadProgress = snapshot.pipe(map(s => (s.bytesTransferred / s.totalBytes) * 100));
          // this.uploadProgress = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          // progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
        },
        (error) => {
          // fail
          console.log(error)
        },
        () => {
          // success
          // fileUpload.url = uploadTask.snapshot.downloadURL
          // fileUpload.name = fileUpload.file.name
          // this.saveFileData(fileUpload)
        }
      );
      // const uploadTask: any = storageRef.child('/uploads/' + displayName + '/' + this.file.name).put(this.file);
      // uploadTask.on('state_changed', (snapshot) => {
      //
      // });
      // uploadTask.then((snapshot) => { // upload the file to storage
      //   console.log(snapshot.bytesTransferred + " / " + snapshot.totalBytes);
      //   if (snapshot.state == firebase.storage.TaskState.SUCCESS) {
      //       console.log("File uploaded successfully.");
      //   }
      //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      // });
      // Store post information to user in database
      console.log(this.title)
      console.log(this.tags)
      console.log(this.description)
    }
  }

  // private saveFileData(fileUpload: FileUpload) {
  //   this.db.list(`uploads`).push(fileUpload);
  // }

  validateForm(title: string, tags: string, description: string ): boolean {
    if (title.length === 0) {
      this.errorMessage = 'Please enter Title!'
      return false
    }

    if (tags.length === 0) {
      this.errorMessage = 'Please enter Tags!'
      return false
    }

    if (description.length === 0) {
      this.errorMessage = 'Please enter Description!'
      return false
    }

    this.errorMessage = ''

    return true
  }

}
