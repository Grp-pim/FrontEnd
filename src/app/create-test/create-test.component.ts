import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import {  MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
  providers: [MessageService], // Add MessageService to providers array
})
export class CreateTestComponent implements OnInit {
  currentStep: number = 1;
  tests: any[] = [];

  Test = {
    name: '',
    description: '',
    difficulty: '',
    duration: 0,
  };
  selectedDifficulty: string = ''; // Variable to store the selected difficulty

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['_id']; // Access the value of _id parameter
      // Now you can use the ID to fetch the corresponding test data from MongoDB
    });
    this.getAllTest();
  }

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }
  goToCreateTest() {
    this.currentStep = 1;
  }

  createTest() {
    console.log(this.Test);
    return this.apiService.createTest({...this.Test,difficulty:this.selectedDifficulty}).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Test Created',
        });
        console.log(data);
        this.getAllTest();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getAllTest() {
    return this.apiService.getAllTests().subscribe(
      (data) => {
        this.tests = data;
        console.log(this.tests);
      },
      (error) => {
        console.log('error fetching', error);
      }
    );
  }

  listTestPage() {
    this.currentStep = 3;
  }
  selectDuration(selectedDuration: number): void {
    this.Test.duration = selectedDuration;
    console.log('Selected duration:', this.Test);
  }

  visitTest(testId: string) {
    const url = `/test/${testId}`;
    window.open(url, '_blank'); // Opens the URL in a new tab
  }
}
