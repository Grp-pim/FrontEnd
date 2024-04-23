import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-listchapter',
  templateUrl: './listchapter.component.html',
  styleUrls: ['./listchapter.component.scss']
})
export class ListchapterComponent implements OnInit {
Chapters:any=[]
  constructor(private cs:ChapterService) { }

  getall()
  {
    this.cs.getAllChapters().subscribe(res=>{
      this.Chapters=res;
     
    })
  }

  delete(id:any){
    const isConfirmed = window.confirm('Are you sure you want to delete this chapter?');
    if (isConfirmed) {
      this.cs.deleteChapter(id).subscribe(res => {
        console.log(res);
        this.getall()
      })
    } else {
      console.log('Deletion cancelled.');
    }
  }

  ngOnInit(): void {
    this.getall();
  }

}
