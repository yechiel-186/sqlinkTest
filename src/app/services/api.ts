import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private http: HttpClient){}

  loginPost(loginDetails: IloginDetails) {
    this.http.post('https://private-052d6-testapi4528.apiary-mock.com/authenticate', loginDetails).subscribe((res) => {
      console.log(res);
      
    })
  }
}

export interface IloginDetails {
  email: string,
  password: string
}