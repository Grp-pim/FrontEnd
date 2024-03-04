import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from '../hint-modal/hint-modal.component';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  chapters: any[] = [];
  randomTask: any;
  currentChapter: number = 1;
  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = '';
  errorTry: number = 0;
  showHintButton: boolean = false;
  executionResult: string = '';
  codeExecutionSuccess: boolean = false; // Flag to track code execution success
  nextChapterButtonClicked: boolean = false; // Flag to track if the next chapter button has been clicked
  hintContent: string = 'aaaa';
  closeModal: any; // Define the type according to your requirement
  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    // this.getAllChapters();
    this.getRandomTask(this.currentChapter);
  }

  // Method to execute code
  executeUserCode() {
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
        }
      },
      error: (httpErrorResponse) => {
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
        // Trigger game start without autoPlay in case of HTTP error
        this.sharedService.triggerStartGame(false);
        this.errorTry++;
        if (this.errorTry >= 2) {
          this.showHintButton = true;
        }
      },
    });
  }

  getRandomTask(currentChapter: number): void {
    this.nextChapterButtonClicked = false; // Reset the flag
    this.apiService.getRandomTask(currentChapter).subscribe(
      (task: any) => {
        this.randomTask = task; // Assign the received task object to the randomTask property
        this.code = task.initialCode;
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
  fetchNextChapterTask() {
    if (!this.nextChapterButtonClicked && this.codeExecutionSuccess) {
      this.nextChapterButtonClicked = true; // Set flag to true to prevent multiple clicks
      this.currentChapter++;
      this.codeExecutionSuccess = false; // Reset code execution success flag
      this.getRandomTask(this.currentChapter);
    }
  }
  // getAllChapters() {
  //   this.apiService.getAllChapters().subscribe(
  //     (data) => {
  //       console.log(data); // Check the retrieved data
  //       this.chapters = data; // Adjust based on the actual structure
  //     },
  //     (error) => {
  //       console.log('error fetching', error);
  //     }
  //   );
  // }
}
