import { UserService } from './../services/user/user.service';
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
  selectedTab: string = 'Dashboard';

  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }
  currentFrame: any = '1';
  items: any[] = [];
  testId: any;
  currentTest: any;
  sub: any;
  userData: any[] = []; // Initialize userData as an empty array
  //yeser
  candidateEmail: string = '';
  candidateName: string = '';
  testLink: string = '';
  emailContent: string;
  modification: any = { subject: '', text: '' };
  submissions: any[] = [];
  sidebarVisible = false;
  selectedItem: any;
  constructor(
    private apiService: ApiService,
    private act: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService
  ) {
    const mailOptions = {
      subject: 'Lien vers votre test',
      text: ` \n\nBonjour ${this.candidateName},\n\nVoici le lien vers votre test : ${this.testLink}\n\nCordialement,\nVotre équipe de recrutement`,
    };
    this.emailContent = mailOptions.text;
  }

  ngOnInit(): void {
    this.act.queryParams.subscribe((params) => {
      const testType = params['type'];
      // Use the testType as needed
    });
    this.testId = this.act.snapshot.paramMap.get('id');
    this.getAllItems();
    this.getTestById(this.testId);
    this.getSubmissions();
  }
  //sidebar
  toggleSidebar(item: any) {
    this.sidebarVisible = !this.sidebarVisible;
    this.selectedItem = item;
    console.log('item selected :', this.selectedItem);
  }
  //
  toFrame1() {
    this.currentFrame = '1';
    // console.log('click on frame 1 ');
    // console.log(this.currentFrame);
  }
  toFrame2() {
    this.currentFrame = '2';
    // console.log('click on frame 2 ');
    // console.log(this.currentFrame);
  }
  toFrame3() {
    this.currentFrame = '3';
    // console.log('click on frame 3 ');
    // console.log(this.currentFrame);
  }
  getAllItems() {
    this.act.queryParams.subscribe((params) => {
      const testType = params['type'];
      if (testType === 'Quiz') {
        this.apiService.getAllItems().subscribe(
          (data) => {
            this.items = data.quizs;
          },
          (error) => {
            console.log('Error fetching quizs:', error);
          }
        );
      } else {
        this.apiService.getAllItems().subscribe(
          (data) => {
            this.items = data.tasks;
          },
          (error) => {
            console.log('Error fetching tasks:', error);
          }
        );
      }
    });
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
        this.currentTest = data.type === 'Quiz' ? data.quiz : data.tasks;
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
  getUserData(submissions: any[]) {
    const userIds = submissions.map((submission) => submission.userId);
    userIds.forEach((userId) => {
      this.userService.getUserById(userId).subscribe(
        (user) => {
          console.log('Fetched user data:', user);
          this.userData.push(user[0]); // Push the first (and only) element of the user array
          console.log('userData:', this.userData);
        },
        (error) => {
          console.log('Error fetching user data:', error);
        }
      );
    });
  }

  getSubmissions(): void {
    this.apiService.getSubmissionPerTest(this.testId).subscribe(
      (data) => {
        this.submissions = data;
        console.log('Fetched submissions:', this.submissions);
      },
      (error) => {
        console.log('Error fetching submissions:', error);
      }
    );
  }
}
