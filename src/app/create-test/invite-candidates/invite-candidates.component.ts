import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-invite-candidates',
  templateUrl: './invite-candidates.component.html',
  styleUrls: ['./invite-candidates.component.css']
})
export class InviteCandidatesComponent implements OnInit {
 
  candidateEmail: string = '';
  candidateName: string = '';
  testLink: string = '';
  emailContent: string ;
  modification: any = { subject: '', text: '' };  // Retirer l'initialisation ici

  constructor(private router: Router, private apiService: ApiService) { 
    // Initialiser emailContent avec le contenu de votre modèle d'e-mail
    const mailOptions = {

      subject: 'Lien vers votre test',
      text: ` \n\nBonjour ${this.candidateName},\n\nVoici le lien vers votre test : ${this.testLink}\n\nCordialement,\nVotre équipe de recrutement`,
    };
    this.emailContent = mailOptions.text;
  }

  ngOnInit(): void {
  }
  
  inviteCandidates() {
    const candidate = {
      email: this.candidateEmail,
      name: this.candidateName,
      testLink: this.testLink
    };
    const candidates = [candidate];
  
    // Utilisez les valeurs des champs de formulaire pour construire l'objet modification
    const modification = {
      subject: this.modification.subject,
      text: this.modification.text,
    };
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
 
}
