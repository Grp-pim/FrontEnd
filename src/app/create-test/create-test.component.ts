import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
  providers: [MessageService], // Add MessageService to providers array
})
export class CreateTestComponent implements OnInit {
  currentStep: number = 1;

  Test = {
    name: '',
    difficulty: '',
  };

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {}

  nextStep() {
    this.currentStep++;
  }

  previousStep() {
    this.currentStep--;
  }

  createTest() {
    return this.apiService.createTest(this.Test).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Test Created',
        });
         setTimeout(() => {
           this.router.navigate(['/compilator']);
         }, 3000); 

        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
