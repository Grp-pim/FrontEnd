import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
})
export class CreateTestComponent implements OnInit {
  ingredient!: string;
  currentStep: number = 1;
  constructor(private router: Router) {}

  ngOnInit(): void {}

  nextStep() {
    this.currentStep++;
  }
  previousStep() {
    this.currentStep--;
  }

  createTest() {
    const testId = '123'; // Replace with actual test ID
    this.router.navigateByUrl(`compilator`);
  }
}
