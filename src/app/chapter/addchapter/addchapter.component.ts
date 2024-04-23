import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-addchapter',
  templateUrl: './addchapter.component.html',
  styleUrls: ['./addchapter.component.scss']
})
export class AddchapterComponent implements OnInit {
chaptername: any;
language: any;
chapterNumber: any;
taskName: any;
taskDescription: any;
initialCode: any;
solutionCode: any;
hint: any;
difficulty: any;
testing: boolean;
type: any;

constructor( private cs:ChapterService) { }
add(): void {
  // Create the JSON body object
  let data: any = {
    name: this.chaptername,
    language: this.language,
    chapterNumber: this.chapterNumber
  
  };

  // Log the data for testing
  console.log(data);

  this.cs.createChapter(data).subscribe(res => {
    console.log(res);
    this.testing = true;
  })
  // Here you can perform further actions like sending the data to a backend API
}


  ngOnInit(): void {
  }

}
