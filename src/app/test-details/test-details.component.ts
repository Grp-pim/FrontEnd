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
  testType: any

  tests: any[] = [];
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
  emailContent: string = ''; // Initialisation ici
  modification: any = { subject: '', text: '' };
  editMode: boolean = false;
  submissions: any[] = [];
  sidebarVisible = false;
  selectedItem: any;
  additionalEmails: string[] = [];

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
    this.act.queryParams.subscribe(params => {
         this.testType = params['type'];
        // Utilisez testType selon vos besoins

        this.testLink = params['testLink'];
        // Assurez-vous que le lien est correctement récupéré ici
        console.log('Test link:', this.testLink);
        // Mettre à jour le contenu de l'e-mail lorsque le composant est initialisé
        this.updateEmailContent();
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
    this.router.navigate(['dashboard/Teacher']);
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
    let updateData;
    if (this.testType === 'Quiz') {
      updateData = { quiz: this.currentTest };
    } else {
      updateData = { tasks: this.currentTest };
    }
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
   //////////////////////////////////////////////////yeser
   addEmail() {
    this.additionalEmails.push('');
  }
  
  removeEmail(index: number) {
    // Implémentez le code pour supprimer l'e-mail à l'index spécifié
    // Par exemple :
    this.additionalEmails.splice(index, 1);
  }
  InviteCandidatTest(testId: string, testType: string) {
    if (testType === 'Code') {
      this.testLink = `/test/${testId}`;
    } else if (testType === 'Quiz') {
      this.testLink = `/quizTest/${testId}`;
    }
  }

updateEmailContent() {
    // Assurez-vous que testLink est défini correctement en fonction du type de test
    const testLink = this.testLink ? `http://localhost:4200${this.testLink}` : '';

    this.emailContent = `Bonjour ${this.candidateName},\n\nVoici le lien vers votre test : ${testLink}\n\nCordialement,\nVotre équipe de recrutement`;
}

inviteCandidates() {
  // Mettez à jour le contenu de l'e-mail avant d'envoyer l'e-mail
  this.updateEmailContent();

  const candidate = {
    email: this.candidateEmail,
    additionalEmails: this.additionalEmails, // Ajoutez les adresses e-mail supplémentaires ici
    name: this.candidateName,
    testLink: this.testLink
  };
  const candidates = [candidate];

  const modification = {
    subject: this.modification.subject,
    text: this.modification.text,
  };

  // Envoyer l'e-mail avec le contenu mis à jour
  this.apiService.sendTestLinkByEmail(candidates, this.emailContent, modification)
  .subscribe(
      () => {
          console.log('Invitation sent successfully.');
      },
      (error) => {
          console.error('Error sending invitation:', error);
      }
  );
}


previewTestLink(testLink: string) {
    // Naviguer vers le lien de prévisualisation du test
    window.open(testLink, '_blank');
}

edit() {
    this.editMode = !this.editMode; // Inverse l'état de l'édition
}

  //////////////////////////////////// end yeseer

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