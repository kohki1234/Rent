import { NgForm } from '@angular/forms';
import { AdminService } from './../admin.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.css']
})
export class CreateCarComponent implements OnInit {

  selectedFile: File = null;
  fd = new FormData();

  constructor(private http: HttpClient, private adminService: AdminService) { }

  ngOnInit() {
  }

  onFileSelected(event) {
  this.selectedFile = event.target.files[0] as File;
  this.fd.append('file', this.selectedFile, this.selectedFile.name);

  this.http.post('http://localhost:3000/api/admin/save-image', this.fd).subscribe(res => console.log(res));

  }

  onCreate(form: NgForm) {
    const filename = this.selectedFile.name;
    this.adminService.createCar(form.value.brand, form.value.model, form.value.power , form.value.seats, filename).subscribe(res => {
      console.log(res);
    });

    form.resetForm();
  }

}
