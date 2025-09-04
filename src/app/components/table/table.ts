import { NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Api } from '../../services/api';

@Component({
  selector: 'app-table',
  imports: [NgClass],
  templateUrl: './table.html',
  styleUrl: './table.scss'
})
export class Table implements OnInit {
  projectsArray: Iproject[] = [];
  displayArray: Iproject[] = [];
  precentsDedlne:string = '0';
  averageScore = 0;
  constructor(private apiService: Api) {
    this.getProjects();
  }
  ngOnInit(): void {
    console.log();

    console.log(this.projectsArray);
  }

  getProjects() {
    this.apiService.getInfo().subscribe((data) => {
      if (data) {
        this.projectsArray = data;
        this.displayArray = data;
        this.calcDedelinePerecnt();
      }
    })
  }

  search(event: any) {
    console.log(event);
    if(!event.data) {
      this.displayArray = this.projectsArray;
      this.calcDedelinePerecnt();
      return;
    }
    this.displayArray = this.projectsArray.filter(p => p.name.toLowerCase().includes(event.data.toLowerCase()));
    console.log(this.displayArray);
    
    this.calcDedelinePerecnt();
  }
  calcDedelinePerecnt() {
    const sumProjects = this.displayArray.length;

    const sumProjectsDedeline = this.displayArray.filter(p => p.madeDadeline == true).length;

    this.precentsDedlne = Number((sumProjectsDedeline / sumProjects) * 100).toFixed(2);

    for (let i = 0; i < this.displayArray.length; i++) {
      this.averageScore += this.displayArray[i].score;
    }
    this.averageScore = (this.averageScore / sumProjects);
    
  }

  sortTable(header: string) {
    this.projectsArray.sort((a:any,b:any) => {
      if (header == 'name') {
      return a[header].localeCompare(b[header]);
    }
      return a[header]-b[header]
    })
  }
}

export interface Iproject {
  "id": string,
  "name": string,
  "score": number,
  "durationInDays": number,
  "bugsCount": number,
  "madeDadeline": boolean
}