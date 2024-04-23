import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrls: ['./list-quiz.component.scss']
})
export class ListQuizComponent implements OnInit {
id: any;
data2: any=[];
data: any=[];

  constructor(private cs:ChapterService, private ActivatedRoute:ActivatedRoute) {
    this.id = this.ActivatedRoute.snapshot.params['id'];
   }

   getQuiz(){
    this.cs.getChapter(this.id).subscribe(res=>{
      this.data=res;
      this.data2=this.data.quiz;
    })
   }

   deletequiz(id:any){
    const isConfirmed = window.confirm('Are you sure you want to delete this quiz?');
    if (isConfirmed) {
      this.cs.deleteQuiz(this.id,id).subscribe(res => {
        console.log(res);
        this.getQuiz();
      })
    } else {
      console.log('Deletion cancelled.');
    }
   }


  ngOnInit(): void {
    this.getQuiz();
  }

}
