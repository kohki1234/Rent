import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatInputModule, MatInput} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatSidenavModule, MatListModule, MatTableModule } from '@angular/material';
import { ManageReservationsComponent } from './manage-reservations/manage-reservations.component';
import { CreateCarComponent } from './create-car/create-car.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { UserService } from './user.service';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ManageReservationsComponent,
    CreateCarComponent,
    MainpageComponent,
    DatepickerComponent,
    AdminUsersComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    RouterModule.forRoot([
      {path: '', component: LoginComponent},
      {path: 'register', component : RegisterComponent},
      {path: 'main', component: MainpageComponent},
      {path: 'create-car', component: CreateCarComponent},
      {path: 'manage', component: ManageReservationsComponent },
      {path: 'users', component: AdminUsersComponent}
    ])
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
