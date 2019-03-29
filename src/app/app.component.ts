import { LoginComponent } from './login/login.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  providers: [LoginComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Rent';

  constructor(private login: LoginComponent) {}

  ngOnInit() {
    this.login.autoAuthUser();
  }
}
