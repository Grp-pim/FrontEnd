import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  id: any;
  test: any = {};
  constructor(private apiService: ApiService, private act: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.fetchTest();
  }

  fetchTest() {
    this.apiService.getTestById(this.id).subscribe(
      (data) => (this.test = data),
      (error) => console.log(`the error : ${error}`)
    );
  }
}
