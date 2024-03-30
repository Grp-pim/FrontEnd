import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { SharedService } from '../shared/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from '../hint-modal/hint-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';

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
  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private act: ActivatedRoute
  ) {}
  ngOnInit(): void {
    // this.getAllChapters();
    this.getRandomTask(this.currentChapter);
    this.spinner.show();
    // read the id in the link
    this.id = this.act.snapshot.paramMap.get('id');
    this.getAllbyId();
    this.code = this.test.tasks[this.currentTaskIndex].initialCode;

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
        if (response.success) {
          this.codeExecutionSuccess = true;
          this.nextChapterButtonClicked = false; // Reset the flag only when execution is successful
          this.loading = false;
        }
      },
      error: (httpErrorResponse) => {
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
        // Trigger game start without autoPlay in case of HTTP error
        this.sharedService.triggerStartGame(false);
        this.errorTry++;
        this.loading = false;
        if (this.errorTry >= 2) {
          this.showHintButton = true;
        }
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
    if (this.currentTaskIndex < this.test.tasks.length - 1) {
      this.currentTaskIndex++;
      this.executionResult = '';
    }
  }
  goToPreviousTask() {
    if (this.currentTaskIndex > 0) {
      this.currentTaskIndex--;
      this.executionResult = '';
    }
  }
}
