import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-test-details',
  templateUrl: './test-details.component.html',
  styleUrls: ['./test-details.component.css'],
  providers: [MessageService],
})
export class TestDetailsComponent implements OnInit {
  currentFrame: any = '1';
  items: any[] = [];
  testId: any;
  currentTest: any;

  //yeser
  candidateEmail: string = '';
  candidateName: string = '';
  testLink: string = '';
  emailContent: string;
  modification: any = { subject: '', text: '' };

  constructor(
    private apiService: ApiService,
    private act: ActivatedRoute,
    private messageService: MessageService,
    private router: Router
  ) {
    const mailOptions = {
      subject: 'Lien vers votre test',
      text: ` \n\nBonjour ${this.candidateName},\n\nVoici le lien vers votre test : ${this.testLink}\n\nCordialement,\nVotre équipe de recrutement`,
    };
    this.emailContent = mailOptions.text;
  }

  ngOnInit(): void {
    this.testId = this.act.snapshot.paramMap.get('id');
    this.getAllItems();
    this.getTestById(this.testId);
  }
  toFrame1() {
    this.currentFrame = '1';
    console.log('click on frame 1 ');
    console.log(this.currentFrame);
  }
  toFrame2() {
    this.currentFrame = '2';
    console.log('click on frame 2 ');
    console.log(this.currentFrame);
  }
  getAllItems() {
    this.apiService.getAllItems().subscribe(
      (data) => {
        this.items = data;
      },
      (error) => {
        console.log('Error fetching items:', error);
      }
    );
  }
  getSeverity(difficulty: string): string {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'danger';
      default:
        return 'info';
    }
  }
  toTestList() {
    this.router.navigate(['test']);
  }
  getTestById(testId: string): void {
    this.apiService.getTestById(testId).subscribe(
      (data) => {
        this.currentTest = Array.isArray(data.quiz) ? data.quiz : [];
      },
      (error) => {
        console.log('Error fetching test:', error);
      }
    );
  }
  saveChanges(): void {
    const updateData = { quiz: this.currentTest };
    this.apiService.updateTest(this.testId, updateData).subscribe(
      (data) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Your test has been updated.',
        });
      },
      (error) => {
        console.log('Error updating Test:', error);
      }
    );
  }
  //yeser
  inviteCandidates() {
    const candidate = {
      email: this.candidateEmail,
      name: this.candidateName,
      testLink: this.testLink,
    };
    const candidates = [candidate];

    // Utilisez les valeurs des champs de formulaire pour construire l'objet modification
    const modification = {
      subject: this.modification.subject,
      text: this.modification.text,
    };
    this.apiService
      .sendTestLinkByEmail(candidates, this.emailContent, modification)
      .subscribe(
        () => {
          console.log('Invitation sent successfully.');
        },
        (error) => {
          console.error('Error sending invitation:', error);
        }
      );
  }
}
