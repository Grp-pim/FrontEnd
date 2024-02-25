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
        console.log(`response: ${JSON.stringify(response)}`);
        this.executionResult = response.output;
        console.log(`zab ${this.executionResult}`);
      },
      error: (error) => {
        console.error(error);
        this.executionResult = `Error: ${error.message}`;
      },
    });
  }
}
