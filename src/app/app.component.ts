import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'plvstik-app';

  constructor(private afAuth: AngularFireAuth){
    this.afAuth.authState.subscribe(user => console.log(user));
  }
}
