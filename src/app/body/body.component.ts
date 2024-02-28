import { Component } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
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

  // Method to execute code
 executeUserCode() {
    this.apiService.executeCode(this.code).subscribe({
        next: (response) => {
            this.executionResult = response.success ? response.output : `Error: ${response.error}`;
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
}