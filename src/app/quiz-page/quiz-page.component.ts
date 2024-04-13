import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.css'],
})
export class QuizPageComponent implements OnInit {
  id: any;
  test: any = {};
  loading: boolean = false;
  loadingMessage: string = 'Executing...';
  currentTaskIndex: number = 0;
  selectedOption: any[] = [];
  db: any;
  constructor(
    private apiService: ApiService,
    private act: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private localStore: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.fetchTest();
    this.spinner.show();
  }

  fetchTest() {
    this.apiService.getTestById(this.id).subscribe(
      (data) => (this.test = data),
      (error) => console.log(`the error : ${error}`)
    );
  }

  goToNextTask() {
    this.loadingMessage = 'Next task...';
    if (this.currentTaskIndex < this.test.quiz.length - 1) {
      this.loading = true; // Set loading to true
      this.currentTaskIndex++;
      setTimeout(() => {
        this.loading = false; // Set loading to false after 5 seconds
      }, 1000);
    }
      this.saveData();

  }
  goToPreviousTask() {
    this.loadingMessage = 'Previous task...';
    if (this.currentTaskIndex > 0) {
      this.loading = true; // Set loading to true

      this.currentTaskIndex--;
      setTimeout(() => {
        this.loading = false; // Set loading to false after 5 seconds
      }, 1000);
    }
      this.saveData();
  }
  saveData() {
    this.localStore.saveData(
      `response-${this.currentTaskIndex}`,
      JSON.stringify(this.selectedOption)
    );
  }
}
