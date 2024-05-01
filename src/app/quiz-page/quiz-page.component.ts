import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalResultComponent } from './modal-result/modal-result.component';
import jwt_decode from 'jwt-decode';

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
  testStartTime: number = 0;
  remainingTime: number = 0;

  constructor(
    private apiService: ApiService,
    private act: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private localStore: LocalStorageService,
    private modalService: NgbModal,
    private router: Router
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

    // Set the start time of the test
    this.testStartTime = Date.now();

    // Call the calculateRemainingTime function every second
    // setInterval(() => {
    //   this.calculateRemainingTime();
    // }, 1000); // 1000 milliseconds = 1 second
  }

  // Method to update selectedOption and save to localStorage
  updateSelectedOption(questionIndex: number, selectedValue: any) {
    this.selectedOption[questionIndex] = selectedValue;
    this.saveData();
  }

  saveData() {
    localStorage.setItem('quizResponses', JSON.stringify(this.selectedOption));
  }
  clearData() {
    localStorage.clear();
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
  decodeToken(token: string): any {
    return jwt_decode(token);
  }

  submitQuiz() {
    // Retrieve selected options from local storage
    const quizResponses = JSON.parse(
      localStorage.getItem('quizResponses') || '{}'
    );

    // Get the token from sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in sessionStorage');
      return;
    }

    // Decode the token to get the user ID
    const decodedToken = this.decodeToken(token);
    const studentId = decodedToken._id;

    // Call the API service to compare the quiz and create the submission
    this.apiService.compareQuiz(this.id, quizResponses).subscribe(
      (response: any) => {
        // Handle response from backend
        if (response) {
          // Update the overall score
          this.overallScore = response.overallScore;
          this.openModal();

          // Create the submission object
          const sub = {
            userId: studentId,
            testId: this.id,
            userChoices: quizResponses,
          };

          // Call the API service to create the submission
          this.apiService.createSubmission(sub).subscribe(
            (response: any) => {
              console.log(response);
            },
            (error: any) => {
              console.log(error);
            }
          );
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  openModal() {
    // Open the modal
    const modalRef = this.modalService.open(ModalResultComponent);
    modalRef.componentInstance.overallScore = this.overallScore;
    console.log(this.overallScore);
  }
  // when time over it logout
  calculateRemainingTime(): void {
    // Get the test duration from the test object
    const testDuration = this.test?.duration; // Assuming 'duration' is the property for test duration

    // Calculate the remaining time
    const currentTime = Date.now();
    const elapsedTime = currentTime - this.testStartTime;
    this.remainingTime = testDuration - Math.floor(elapsedTime / 1000); // Convert milliseconds to seconds

    // If the remaining time is less than or equal to 0, logout
    if (this.remainingTime <= 0) {
      this.logOut();
    }
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
    this.clearData();
  }
  // end countdown time
}
