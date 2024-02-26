import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent {
  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = `
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

  executionResult: string = '';
  constructor(private apiService: ApiService) {}

  // Method to execute code
  executeUserCode() {
    this.apiService.executeCode(this.code).subscribe({
      next: (response) => {
        // Check if the response indicates success
        if (response.success) {
          this.executionResult = response.output;
        } else {
          // If success is false, display the error message
          this.executionResult = `Error: ${response.error}`;
        }
      },
      error: (httpErrorResponse) => {
        // Handle any errors that occur during the HTTP request
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
      },
    });
  }
}
