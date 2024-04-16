import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalResultComponent } from './modal-result/modal-result.component';

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
  overallScore: number = 0;

  constructor(
    private apiService: ApiService,
    private act: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private localStore: LocalStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.id = this.act.snapshot.paramMap.get('id');
    this.fetchTest();
    this.spinner.show();
    // store response if exist on quiz //
    const storedData = localStorage.getItem('quizResponses');
    if (storedData) {
      this.selectedOption = JSON.parse(storedData);
    }
  }

  // Method to update selectedOption and save to localStorage
  updateSelectedOption(questionIndex: number, selectedValue: any) {
    this.selectedOption[questionIndex] = selectedValue;
    this.saveData();
  }

  saveData() {
    localStorage.setItem('quizResponses', JSON.stringify(this.selectedOption));
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
  }
  submitQuiz() {
    // Retrieve selected options from local storage
    const quizResponses = JSON.parse(
      localStorage.getItem('quizResponses') || '{}'
    );

    // Use the 'id' variable obtained from ActivatedRoute
    this.apiService
      .compareQuiz(this.id, quizResponses)
      .subscribe((response: any) => {
        // Handle response from backend
        // console.log(response);
        if (response) {
          // Update the overall score
          this.overallScore = response.overallScore;
          console.log('zab:', this.overallScore); // Log the overall score
          this.openModal();
        }
      });
  }
  openModal() {
  
    // Open the modal
    const modalRef = this.modalService.open(ModalResultComponent);
    modalRef.componentInstance.overallScore = this.overallScore;
    console.log(this.overallScore);
  }
}
