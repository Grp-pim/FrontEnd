import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { SharedService } from '../shared/shared.service';
import { error } from 'node:console';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit {
  chapters: any[] = [];
  randomTask: any;

  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

  executionResult: string = '';

  constructor(
    private apiService: ApiService,
    private sharedService: SharedService
  ) {}
  ngOnInit(): void {
    // this.getAllChapters();
    this.getRandomTask();
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

  getRandomTask(): void {
    this.apiService.getRandomTask().subscribe(
      (task: any) => {
        this.randomTask = task; // Assign the received task object to the randomTask property
      },
      (error: any) => {
        console.error('Error fetching random task:', error);
        // Handle the error appropriately
      }
    );
  }
}
