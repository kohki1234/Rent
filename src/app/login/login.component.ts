import { UserService } from './../user.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  token: any;

  constructor(private userservice: UserService, private router: Router) {

  }

  onlogin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.userservice.loginUser(email, password).subscribe(result => {
      this.userservice.authenticated.next(true);
      const admin = result.admin;
      const token = result.token;
      this.userservice.isAdmin.next(admin);
      const expires = result.expiresIn;

      if (token) {
        this.userservice.setTimer(expires);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expires * 1000);
        this.userservice.saveUserData(token, expirationDate, admin);
        this.router.navigate(['/main']);
      }
    });
  }

  autoAuthUser() {
    const authInfo = this.userservice.getUserData();
    if (!authInfo) {
      return;
    }

    const now = new Date();
    const expiresIn = authInfo.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInfo.token;
      this.userservice.authenticated.next(true);
    }

  }
}
