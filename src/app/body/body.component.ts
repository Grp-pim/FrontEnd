import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { SharedService } from '../shared/shared.service';
import { error } from 'node:console';
import { Router } from '@angular/router';


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

  executionResult: string = '';

  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router
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
          // Fetch next chapter's task upon successful execution
          this.currentChapter++;
          this.getRandomTask(this.currentChapter);
        }
      },
      error: (httpErrorResponse) => {
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
        // Trigger game start without autoPlay in case of HTTP error
        this.sharedService.triggerStartGame(false);
      },
    });
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

  getRandomTask(currentChapter: number): void {
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
  refreshRoute() {
    // Navigate to the current route with the option to skip the location change
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate to the current route again to trigger a refresh
      this.router.navigate([this.router.url]);
      console.log('refreshing');
    });
  }
}
