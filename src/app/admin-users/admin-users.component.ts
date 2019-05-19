import { element } from 'protractor';
import { MatTableDataSource, MatPaginator, MatTable } from '@angular/material';
import { AdminService } from './../admin.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  displayedColumns = ['email', 'isAdmin', 'edit'];
  dataSource = new MatTableDataSource();
  users: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('table') table: MatTable<any>;

  constructor(private adminservice: AdminService) { }

  ngOnInit() {
    this.adminservice.getUsers().subscribe(res => {
      const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        ELEMENT_DATA.push({email, isAdmin});
      });

      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  onDelete(element) {
    this.adminservice.deleteUser(element.email).subscribe(res => {
      const ELEMENT_DATA = [];
      this.users = res;
      this.users.forEach(user => {
        const email = user.email;
        const isAdmin = user.isAdmin;
        ELEMENT_DATA.push({email, isAdmin});
      });

      this.dataSource.data = ELEMENT_DATA;
      this.dataSource.paginator = this.paginator;
    });
  }

}
