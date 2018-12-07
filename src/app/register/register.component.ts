import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // authService: AuthServiceService;
  errorMessage:string;
  successMessage:string;
  registerForm: FormGroup;

  constructor( private fb: FormBuilder, private af: AuthService ) { }

  // googleSignup() {
  //   console.log("sign in");
  //   this.af.login();
  // }

  ngOnInit() : void {
    this.buildForm();
  }

  buildForm() : void {
    this.registerForm = this.fb.group({
      'email': ['', [
          Validators.required,
          Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]
    ],
    });
  }

}
