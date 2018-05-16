import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserSignUp, UserService} from "../shared/services";
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'ngh-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  readonly registerForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {
    this.registerForm = fb.group({
      firstName   : [, Validators.minLength(2)],
      lastName: [, Validators.minLength(2)],
      titleCode: [, Validators.minLength(2)],
      password: [, Validators.minLength(2)],
      uid: [, Validators.minLength(2)]
    }, {
      // validator: [ minLessThanMaxValidator ]
    });
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      let userSignUp : UserSignUp;

      console.log(this.registerForm.value);
      userSignUp = this.registerForm.value;

      console.log(userSignUp);

      this.userService.registerUser(userSignUp).subscribe(data => {
          console.log("Registered: " + data.customerId);
          this.snackBar.open("Registered: " + data.customerId, null, { duration: 5000 });
          this.router.navigate([ '/' ]);
        },
        error => {
          console.error("Registration failed:", error.error.errors);
          let messageString : string = '';
          for (let errorEntry of error.error.errors) {
            messageString += errorEntry.message + "(" + errorEntry.subject + ") ";
          }
          this.snackBar.open("Registration failed: " + messageString, null, { duration: 5000 });
        }
      )


      // this.search.emit();
      // this.router.navigate([ '/search' ], {
      //   queryParams: withoutEmptyValues(this.searchForm.value)
    } else {
      // });
      console.log("Not valid this.loginForm: " + this.registerForm);
    }
  }
}
