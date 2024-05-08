import { SharedService } from './../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from '../hint-modal/hint-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from '../local-storage/local-storage.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css'],
})
export class TestPageComponent implements OnInit {
  // test page dec
  test: any;
  id: any;
  currentTaskIndex: number = 0;
  code: string = '';
  totalTask : number = 4;
  // selectedOption: any[] = [];
  // Initialize selectedOption array with false values
  selectedOption: boolean[] = Array.from({ length: this.totalTask }, () => false);
  //
  chapters: any[] = [];
  totalChapter: number = this.chapters.length;
  randomTask: any;
  currentChapter: number = 1;
  editorOptions = { theme: 'vs-dark', language: 'java' };
  errorTry: number = 0;
  showHintButton: boolean = false;
  executionResult: string = '';
  codeExecutionSuccess: boolean = false; // Flag to track code execution success
  nextChapterButtonClicked: boolean = false; // Flag to track if the next chapter button has been clicked
  hintContent: string = '';
  closeModal: any; // Define the type according to your requirement
  loading: boolean = false;
  loadingMessage: string = 'Executing...';

  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private act: ActivatedRoute,
    private localStore: LocalStorageService,
    private SharedService: SharedService
  ) {}
  ngOnInit(): void {
    // this.getAllChapters();
    this.getRandomTask(this.currentChapter);
    this.spinner.show();
    // read the id in the link
    this.id = this.act.snapshot.paramMap.get('id');
    this.getAllbyId();
    this.code = this.test.tasks[this.currentTaskIndex].initialCode;
    // local storage
    const storedData = localStorage.getItem('taskResponses');
    if (storedData) {
      this.selectedOption = JSON.parse(storedData);
    }
  }

  // Method to execute code
  executeUserCode() {
    this.loading = true;
    this.apiService.executeCode(this.code).subscribe({
      next: (response) => {
        this.executionResult = response.success
          ? response.output
          : `Error: ${response.error}`;
        // Trigger game start with autoPlay based on success
        this.sharedService.triggerStartGame(response.success);
        this.updateSelectedOption(this.currentTaskIndex, true);
        if (response.success) {
          this.codeExecutionSuccess = true;
          this.nextChapterButtonClicked = false; // Reset the flag only when execution is successful
        }
        this.loading = false;
        // Save taskResponse to localStorage
      },
      error: (httpErrorResponse) => {
        this.executionResult = `Error : ${httpErrorResponse.error.error}`;
        // Trigger game start without autoPlay in case of HTTP error
        this.sharedService.triggerStartGame(false);
        this.loading = false;
        this.updateSelectedOption(this.currentTaskIndex, false);
      },
    });
  }

  getRandomTask(currentChapter: number): void {
    this.executionResult = '';
    this.nextChapterButtonClicked = false; // Reset the flag
    this.apiService.getRandomTask(currentChapter).subscribe(
      (task: any) => {
        this.randomTask = task; // Assign the received task object to the randomTask property
        // this.code = task.initialCode;
      },
      (error: any) => {
        console.error('Error fetching random task:', error);
        // Handle the error appropriately
      }
    );
  }
  openModal() {
    const modalRef = this.modalService.open(HintModalComponent);
    // Optionally, pass data to the modal component
    modalRef.componentInstance.hintContent = this.randomTask.hint;
  }
  refreshRoute() {
    // Navigate to the current route with the option to skip the location change
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate to the current route again to trigger a refresh
      this.router.navigate([this.router.url]);
      console.log('refreshing');
    });
  }
  // fetchNextChapterTask() {
  //   if (!this.nextChapterButtonClicked && this.codeExecutionSuccess) {
  //     this.nextChapterButtonClicked = true; // Set flag to true to prevent multiple clicks
  //     this.currentChapter++;
  //     this.codeExecutionSuccess = false; // Reset code execution success flag
  //     this.getRandomTask(this.currentChapter);
  //   }
  // }
  // for sidebar
  // getAllChapters() {
  //   this.apiService.getAllChapters().subscribe(
  //     (data) => {
  //       // console.log(data); // Check the retrieved data
  //       this.chapters = data; // Adjust based on the actual structure
  //     },
  //     (error) => {
  //       console.log('error fetching', error);
  //     }
  //   );
  // }
  //end for sidebar
  getAllbyId() {
    this.apiService.getTestById(this.id).subscribe(
      (data) => {
        this.test = data;
        console.log(this.test);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  goToNextTask() {
    this.loadingMessage = 'Next task...';
    if (this.currentTaskIndex < this.test.tasks.length - 1) {
      this.loading = true; // Set loading to true
      this.executionResult = '';
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
      this.executionResult = '';
      setTimeout(() => {
        this.loading = false; // Set loading to false after 5 seconds
      }, 1000);
    }
  }
  // Method to update selectedOption and save to localStorage
  updateSelectedOption(questionIndex: any, status: any) {
    this.selectedOption[questionIndex] = status;
    this.saveData();
  }
  saveData() {
    localStorage.setItem('taskResponses', JSON.stringify(this.selectedOption));
  }
  clearData() {
    localStorage.removeItem('taskResponses');
  }
  submitTest() {
    // Retrieve selected options from local storage
    const taskResponses = JSON.parse(
      localStorage.getItem('taskResponses') || '{}'
    );

    // Get the token from sessionStorage
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in sessionStorage');
      return;
    }

    // Decode the token to get the user ID
    const decodedToken = this.SharedService.decodeToken(token);
    const studentId = decodedToken._id;
    const sub = {
      userId: studentId,
      testId: this.id,
      userChoices: taskResponses,
      overallScore: 11,
    };

    this.apiService.createSubmission(sub).subscribe(
      (response: any) => {
        console.log(response);
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.clearData();
  }
}