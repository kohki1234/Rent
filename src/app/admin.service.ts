import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminService {

  constructor(private http: HttpClient) { }

  createCar(brand: string, model: string, power: string, seats: any, imgUrl: string ) {
    const carData = {brand, model, power, seats, imgUrl};
    return this.http.post('http://localhost:3000/api/admin/create-car', carData);
  }
}

