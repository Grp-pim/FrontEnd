import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-invite-candidates',
  templateUrl: './invite-candidates.component.html',
  styleUrls: ['./invite-candidates.component.css']
})
export class InviteCandidatesComponent implements OnInit {
 
  candidateEmail: string = '';
  candidateName: string = '';
  testLink: string = '';
  emailContent: string = ''; // Initialisation nécessaire
  modification: any = { subject: '', text: '' };  // Retirer l'initialisation ici
  editMode: boolean = false;


  constructor(private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.testLink = params['testLink'];
      // Assurez-vous que le lien est correctement récupéré ici
      console.log('Test link:', this.testLink);
      // Mettre à jour le contenu de l'e-mail lorsque le composant est initialisé
      this.updateEmailContent();
    });
  }

  // Mettez à jour emailContent avec le contenu de votre modèle d'e-mail
  updateEmailContent() {
    this.emailContent = `Bonjour ${this.candidateName},\n\nVoici le lien vers votre test : http://localhost:4200${this.testLink}\n\nCordialement,\nVotre équipe de recrutement`;
  }
  
  inviteCandidates() {
    // Mettez à jour le contenu de l'e-mail avant d'envoyer l'e-mail
    this.updateEmailContent();

    const candidate = {
      email: this.candidateEmail,
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
}
