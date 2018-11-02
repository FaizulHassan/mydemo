import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserAuthenticationService } from 'src/app/services/user-authentication/user-authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
  
export class SigninComponent implements OnInit {
  ngOnInit() {
    
    // check if user loggedin, if so then redirect login component to user-profile component
    if (this._userAuthService.isLoggedIn()) {
      this.router.navigateByUrl('/user-profile');
    }
   }
  
  userJWTToken: string;
  validateForm: FormGroup;
  errorMessage: string;
  errorFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private _userAuthService: UserAuthenticationService,
    private router: Router
  ) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  submitForm = ($event, value) => {
    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    this.userSignin(value);
  };  

  userSignin(formInputs): void {
    this._userAuthService.userSignin(formInputs).subscribe(
      data => {
        console.log('Signin successful', data);
        this.userJWTToken = data.token;
        this._userAuthService.setJWTToken(this.userJWTToken);
        
        /* getUserEmailFromJWTToken: gets email from token & sets email address of logged in user in localstorage */
        this._userAuthService.getUserEmailFromJWTToken();

        // Redirecting user to profile page
        this.router.navigateByUrl('/dashboard');
      },
      error => {
        this.errorFlag = true;
        console.log('Signin unsuccessful', error);
        console.log(error.error.status);
        if (error.error.status==404) {
          this.errorMessage = 'Not a valid email address';
        }else if (error.error.status==401) {
          this.errorMessage = 'Not a valid password';
        } else {
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}
