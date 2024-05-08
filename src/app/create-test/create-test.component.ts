import { SharedService } from './../shared/shared.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css'],
  providers: [MessageService], // Add MessageService to providers array
})
export class CreateTestComponent implements OnInit {
  ingredient!: string;
  currentStep: number = 1;
  tests: any[] = [];
  testLink: string = ''; // Déclarez la propriété testLink ici
  Test = {
    name: '',
    description: '',
    type: '',
    difficulty: '',
    duration: 0,
  };
  selectedDifficulty: string = '';
  selectedLanguage: string = '';
  testType: string = '';
  currentUserId: any;
  selectedTab: string = 'Dashboard';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['_id']; // Access the value of _id parameter
      // Now you can use the ID to fetch the corresponding test data from MongoDB
    });
    // this.getAllTest();
    //retieve current user id from shared service
    this.sharedService.sendCurrentUserid();
    this.currentUserId = this.sharedService.getCurrentUserId();
    console.log('Current User ID:', this.currentUserId);
    this.getTestByUser();
  }
  //sidebar
  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }
  ///
  nextStep() {
    this.currentStep = 2;
    console.log('current step ', this.currentStep);
  }

  previousStep() {
    this.currentStep = 1;
    console.log('current step ', this.currentStep);
  }

  createTest() {
    return this.apiService
      .createTest({
        ...this.Test,
        difficulty: this.selectedDifficulty,
        type: this.testType,
        creator: this.currentUserId,
      })
      .subscribe(
        (data) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Test Created',
          });
          this.getTestByUser();
        },
        (error) => {
          console.error('error creating Test :', error);
        }
      );
  }

  // getAllTest() {
  //   return this.apiService.getAllTests().subscribe(
  //     (data) => {
  //       this.tests = data;
  //       // console.log(this.tests);
  //     },
  //     (error) => {
  //       console.log('error fetching', error);
  //     }
  //   );
  // }
  getTestByUser() {
    return this.apiService.getTestByUser(this.currentUserId).subscribe(
      (data) => {
        this.tests = data;
        // console.log(this.tests);
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
  }

  previewTestLink(testId: string, testType: string): string {
    let testLink: string = ''; // Initialisation par défaut
     if (testType === 'Code') {
       const url = `/test/${testId}`;
       this.router.navigate([url]);
     } else if (testType === 'Quiz') {
       const url = `/quizTest/${testId}`;
       this.router.navigate([url]);
     }
    return testLink;
  }


toTestDetails(testId: string, testType: string) {
  const testLink = this.previewTestLink(testId, testType);
  this.router.navigate(['test-details', testId], {
    queryParams: { type: testType, testLink: testLink }, // Passer le lien vers le test comme paramètre
  });
}

}