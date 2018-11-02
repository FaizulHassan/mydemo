import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';

import { Observable, Observer } from 'rxjs';
import { UserAuthenticationService } from 'src/app/services/user-authentication/user-authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  ngOnInit() {}

  /* Variable initialization */

  defaultValue:   string;
  successMessage: boolean;
  errorMessage:   string;
  errorOccurred: boolean;
  successfulSubmission: boolean = true;
  checkUser:      string;
  validateForm:   FormGroup;

  submitForm = ($event, value) => {

    /* setting variable to null starts*/
    this.errorOccurred = false;
    this.successMessage = false;
    /* setting variable to null ends*/

    $event.preventDefault();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    /* Http Post method */
    this.userSignup(value);
  };

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.validateForm.controls.confirm.updateValueAndValidity()
    );
  }

  emailAsyncValidator = (control: FormControl) =>
    Observable.create((observer: Observer<ValidationErrors>) => {
      setTimeout(() => {
        if (control.value === this.checkUser) {
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 2000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  constructor(
    private fb: FormBuilder,
    private _userAuthService: UserAuthenticationService
  ) {
    this.validateForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email], [this.emailAsyncValidator]],
      password: ['', [Validators.required]],
      confirm: ['', [this.confirmValidator]],
      comment: [''],
      role: ['', [Validators.required]]
    });
  }

  /* Subscribing to userAuthentication Service */

  userSignup(formInputs): void {
    this._userAuthService.userSignup(formInputs).subscribe(
      data => {
        console.log('Signup successful');
        this.successMessage = true;
        this.successfulSubmission = false;

        //setTimeout(() => { this.successMessage = false; }, 5000);
      },
      error => {
        console.log('Signup unsuccessful');
        this.errorOccurred = true;
        this.errorMessage = error['error']['message'];

        this.successfulSubmission = true;
      }
    );
  }

  /* Get E-Mail Id to check if it exists already */

  getUserMailId(formInputs): void {
    console.log('formInputs:', formInputs);
    this._userAuthService.getUserMailId(formInputs).subscribe(
      data => {        
        this.checkUser = data['email'];
      },
      error => {
        console.log('unsuccessful:',error);        
      }
    );
  }
}
