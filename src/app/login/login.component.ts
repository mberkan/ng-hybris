import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../shared/services";
import {UserLogin} from "../shared/services/user.service";

@Component({
  selector: 'ngh-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  readonly loginForm: FormGroup;

  constructor(fb: FormBuilder, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      uid: [, Validators.minLength(2)],
      password: [, Validators.minLength(2)]
    }, {
      // validator: [ minLessThanMaxValidator ]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      let userLogin : UserLogin;

      console.log(this.loginForm.value);
      userLogin = this.loginForm.value;

      console.log(userLogin);

      this.userService.loginUser(userLogin).subscribe(data => {
          console.log("Logged: " + data);
          this.snackBar.open("Logged in", null, { duration: 5000 });
          this.router.navigate([ '/' ]);
        },
        error => {
          console.error("Login failed:", error);
          this.snackBar.open("Login failed: " + error, null, { duration: 5000 });
        }
      )
    } else {
      console.log("Not valid this.loginForm: " + this.loginForm);
    }
  }

}
