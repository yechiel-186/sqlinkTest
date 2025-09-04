import { Injectable } from '@angular/core';
import { Ipersondetails, LoginResponse } from './api';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data {
  persondetails!: Ipersondetails;
  public personDetails$ = new BehaviorSubject<Ipersondetails>(this.persondetails);
  constructor() {

  }

  setPersonDetails(persondetails: Ipersondetails) {
    this.persondetails = persondetails;
    this.personDetails$.next(persondetails);
  }
}
