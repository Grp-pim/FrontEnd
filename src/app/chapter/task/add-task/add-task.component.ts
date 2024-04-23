import { Component, OnInit } from '@angular/core';
import { TestingService } from 'app/services/testing/testing.service';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  testing: any;
  name: any;
  description: any;
  initialCode: any;
  solutionCode: any;
  order: any;
  hint:any;
  difficulty: any;
  id:any
    constructor(private ts: ChapterService, private ActivatedRoute:ActivatedRoute) {
      this.id = this.ActivatedRoute.snapshot.params['id'];
     }
    addTask() {
     let data:any={
      chapterId:this.id,
      name:this.name,
      description:this.description,
      initialCode:this.initialCode,
      solutionCode:this.solutionCode,
      order:this.order,
      difficulty:this.difficulty,
      hint:this.hint
     }
     console.log(data);
     this.ts.addTask(data).subscribe(res => {
       console.log(res);
       this.testing=true;
     })
      }
  ngOnInit(): void {
  }

}
