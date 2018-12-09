import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // authService: AuthServiceService;

  successMessage:string;
  errorMessage = '';
  name = '';
  username = '';
  email = '';
  password = '';
  error: { email: string, password: string, name: string, username: string, message: string } = {email: '', password: '', name: '', username: '', message: '' };

  constructor( public authService: AuthService, private router: Router ) { }

  // googleSignup() {
  //   console.log("sign in");
  //   this.af.login();
  // }

  ngOnInit() : void {
    // this.buildForm();
  }

  clearErrorMessage() {
    this.errorMessage = '';
    this.error = { email: '', password: '', name: '', username: '', message: '' };
  }

  validateForm(name: string, username: string, email: string, password: string): boolean {
    if (name.length === 0) {
      this.errorMessage = 'Please enter Name!'
      return false
    }

    if (username.length === 0) {
      this.errorMessage = 'Please enter Username!'
      return false
    }

    if (email.length === 0) {
      this.errorMessage = 'Please enter Email!'
      return false
    }

    if (password.length === 0) {
      this.errorMessage = 'Please enter Password!'
      return false
    }

    if (password.length < 6) {
      this.errorMessage = 'Password should be at least 6 characters!'
      return false
    }

    this.errorMessage = ''

    return true
  }

  onSignUp(): void {
    this.clearErrorMessage()
    if (this.validateForm(this.name, this.username, this.email, this.password)) {
      this.authService.signUpWithEmail(this.email, this.password)
        .then(() => {
          this.authService.addUserToDatabase(this.name, this.username); // Add user to database
          this.router.navigate(['/', this.authService.currentUsername()])
        }).catch(_error => {
          this.error = _error
          this.router.navigate(['/'])
        })
    }
  }

  checkUserInfo() {
    if (this.authService.isUserEmailLoggedIn) {
      // this.router.navigate(['/user'])
      this.router.navigate(['/'])
    }
  }

  // buildForm() : void {
  //   this.registerForm = this.fb.group({
  //     'email': ['', [
  //         Validators.required,
  //         Validators.email
  //       ]
  //     ],
  //     'password': ['', [
  //       Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
  //       Validators.minLength(6),
  //       Validators.maxLength(25)
  //     ]
  //   ],
  //   });
  // }

}
