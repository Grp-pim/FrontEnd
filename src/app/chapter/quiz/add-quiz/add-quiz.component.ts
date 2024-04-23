import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from 'app/services/chapter/chapter.service';

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  testing: any;
  name: any;
  description: any;
  options: any;
  solutionQuiz: any;
  difficulty: any;
  id: any;

  constructor(private cs: ChapterService, private ActivatedRout: ActivatedRoute) {
    this.id = this.ActivatedRout.snapshot.params['id'];
  }
  add() {
    let data: any = {
      name: this.name,
      description: this.description,
      options: this.options,  // Changed here as well
      solutionQuiz: this.solutionQuiz,
      difficulty: this.difficulty
    };
    console.log(data); // Check what data is being sent
    this.cs.addQuiz(data, this.id).subscribe(res => {
      console.log(res);
      this.testing = true;
    });
  }

  ngOnInit(): void {
  }

}
