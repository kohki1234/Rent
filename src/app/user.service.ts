import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  createUser(email: string, password: string) {
    const authData = {email, password};
    return this.http.post('http://localhost:3000/api/user/signup', authData);

  }

  loginUser(email: string, password: string) {
    const authData = {email, password};
    return this.http.post<{token: string, expiration: any, admin: any}>('http://localhost:3000/api/user/login', authData);


  }
}
