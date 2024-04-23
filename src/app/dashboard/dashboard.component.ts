import { name } from './../../../node_modules/@leichtgewicht/ip-codec/types/index.d';
import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'app/services/chapter/chapter.service';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';
interface CountResponse {
  count: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  Chapters: any = [];
  data: any;
  chartOptions: any;
  basicData: any;
  datraNames:any=[];

  basicDatacountCHapterNumber: any;
  countCHapterNumbervar:any=[];

  basicDataccountByTasksLength: any;
  countByTasksLengthvar:any=[];
  constructor(private cs: ChapterService) { }

  ngOnInit() {
    this.getAllChapters();
    this.countByNames();
    this.countCHapterNumber();
    this.countByTasksLength();
  }

  getAllChapters() {
    this.cs.getAllChapters().subscribe((res: any) => {
      this.Chapters = res;
      console.log(this.Chapters);
      //loop and get the names of all the chapters 
     
    });
  }

  countCHapterNumber(){
    this.cs.countCHapterNumber().subscribe((res: any) => {
      this.countCHapterNumbervar=res;
      console.log(this.countCHapterNumbervar);
      //loop and get the names of all the chapters
      let chapter=[];
      let count = [];
      for (let i = 0; i < this.countCHapterNumbervar.length; i++) {
        chapter.push(this.countCHapterNumbervar[i].chapterNumber);
        count.push(this.countCHapterNumbervar[i].count);
      }
      this.basicDatacountCHapterNumber={

        labels: chapter,
        datasets: [
          {
            label: 'Chapter Number By ChapterNumber',
            backgroundColor: '#0ED593',
            data: count
          },
        ]

      }
    });
  }
  countByTasksLength(){
    this.cs.countByTasksLength().subscribe((res: any) => {
      this.countByTasksLengthvar=res;
      console.log(this.countByTasksLengthvar);
      //loop and get the names of all the chapters 
     let tasks = [];
     let length = [];
     for (let i = 0; i < this.countByTasksLengthvar.length; i++) {
       tasks.push(this.countByTasksLengthvar[i].name);
       length.push(this.countByTasksLengthvar[i].tasksLength);
     }
     this.basicDataccountByTasksLength = {
       labels: tasks,
       datasets: [
         {
           label: 'Chapter Number By tasksLength',
           backgroundColor: '#D50EA2',
           data: length
         },
       ]
     };
    });
  }
  countByNames() {
    this.cs.countByNames().subscribe((res: any) => {
      this.datraNames = res;
      console.log(this.datraNames);
  
      let names = [];
      let count = [];
  //loop the datraNames
  for (let i = 0; i < this.datraNames.length; i++) {
    names.push(this.datraNames[i].name);
    count.push(this.datraNames[i].count);
  }
      
      this.basicData = {
        labels: names,
        datasets: [
          {
            label: 'Chapter Number By names',
            backgroundColor: '#42A5F5',
            data: count
          },
        ]
      };
    })
  }

 

}
