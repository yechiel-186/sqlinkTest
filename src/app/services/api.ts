import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Token, TokenType } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Iproject } from '../components/table/table';

@Injectable({
  providedIn: 'root'
})
export class Api {
  constructor(private http: HttpClient){}

  loginPost(loginDetails: IloginDetails) {
    return this.http.post<LoginResponse[]>('http://localhost:5203/Users/login', loginDetails)
}

  getInfo(){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Iproject[]>('http://localhost:5203/Projects/GetProjects', {headers});
  }
}

export interface IloginDetails {
  email: string,
  password: string
}

export interface LoginResponse {
  token: string;
  personalDetails: {
    name: string;
    Team: string;
    joinedAt: string;
    avatar: string;
  };
}

export interface Ipersondetails {
    name: string;
    Team: string;
    joinedAt: string;
    avatar: string;
}