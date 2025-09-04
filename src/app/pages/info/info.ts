import { Component } from '@angular/core';
import { Data } from '../../services/data';
import { Api, Ipersondetails } from '../../services/api';
import { Iproject, Table } from '../../components/table/table';

@Component({
  selector: 'app-info',
  imports: [Table],
  templateUrl: './info.html',
  styleUrl: './info.scss'
})
export class Info {
  personDetails!: Ipersondetails;
  
  constructor(private dataService: Data){
    this.personDetails = this.dataService.personDetails$.getValue();
    if(!this.personDetails) {
      const storageData = localStorage.getItem('personDetails');
      this.personDetails = storageData ? JSON.parse(storageData) : null;
    }
  }
}
