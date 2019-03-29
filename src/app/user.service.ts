import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class UserService {

  url = '';
  path = '';

  tokenTimer: any;

  isAdmin = new Subject();
  authenticated = new BehaviorSubject(false);
  selectedCars = new Subject();

  constructor(private http: HttpClient, private router: Router) { }


  changeAdmin(data: any) {
    this.isAdmin.next(data);
  }


  setTimer(duration: any) {
    this.tokenTimer = setTimeout(() => {
      this.onLogout();
    }, duration * 1000);
  }

  onLogout() {
    this.authenticated.next(false);
    clearTimeout(this.tokenTimer);
    this.changeAdmin(0);
    localStorage.removeAll();
    this.router.navigate(['']);
  }

  getUserData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    const admin = localStorage.getItem('admin');

    if (!token || !expiration) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expiration),
      admin
    };
  }

  // Save the user date to local strage = browser cache
  saveUserData(token: string, expiration: Date, admin: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expiration.toString());
    localStorage.setItem('admin', admin);
  }

  // Create a new user method
  createUser(email: string, password: string) {
    const authData = {email, password};
    return this.http.post('http://localhost:3000/api/user/signup', authData);

  }

  // Login user method
  loginUser(email: string, password: string) {
    const authData = {email, password};
    return this.http.post<{token: string, expiresIn: any, admin: any}>('http://localhost:3000/api/user/login', authData);
  }


}
