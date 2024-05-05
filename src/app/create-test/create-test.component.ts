import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { MessageService } from 'primeng/api';
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
  testLink: string = ''; // Déclarez la propriété testLink ici

  Test = {
    name: '',
    description: '',
    type: '',
    difficulty: '',
    duration: 0,
  };
  selectedDifficulty: string = '';
  testType: string = ''; // Déclarer et initialiser testLink


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
    return this.apiService.createTest({
      name: this.Test.name,
      description: this.Test.description,
      type: this.testType,
      difficulty: this.selectedDifficulty,
      duration: this.Test.duration,
    }).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Test Created',
        });
        this.getAllTest();
      },
      (error) => {
        console.error('Error creating test:', error);
        // Gérer les erreurs ici si nécessaire
      }
    );
  }

  getAllTest() {
    return this.apiService.getAllTests().subscribe(
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

  InviteCandidatTest(testId: string, testType: string) {
    let testLink: string = ''; // Initialisation par défaut

    if (testType === 'Code') {
      testLink = `/test/${testId}`;
    } else if (testType === 'Quiz') {
      testLink = `/quizTest/${testId}`;
    }

    // Appelez la méthode pour passer le lien vers invite-candidates
    this.passTestLinkToInvite(testLink);
  }

  passTestLinkToInvite(testLink: string) {
    // Assurez-vous de passer le lien correctement en tant que paramètre de requête
    this.router.navigate(['/invite-candidates'], { queryParams: { testLink: testLink } });
  }

  navigateToInvitePage() {// Initialisation par défaut
    this.router.navigate(['/invite-candidates']);
  }
  previewTestLink(testId: string, testType: string) {
    let testLink: string = ''; // Initialisation par défaut
  
    if (testType === 'Code') {
      testLink = `/test/${testId}`;
    } else if (testType === 'Quiz') {
      testLink = `/quizTest/${testId}`;
    }
  
    // Ouvrir un nouvel onglet avec le lien de prévisualisation du test
    window.open(testLink, '_blank');
  }
}
