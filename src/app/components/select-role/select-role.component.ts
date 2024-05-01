import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/Oauth_google/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-select-role',
  templateUrl: './select-role.component.html',
  styleUrls: ['./select-role.component.css']
})
export class SelectRoleComponent implements OnInit {

  selectedRole: any;

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.showRoleSelectionDialog()
  }

  showRoleSelectionDialog(): void {
    Swal.fire({
      title: 'Select your role to continue',
      input: 'radio',
      inputOptions: {
        'Student': 'Student',
        'Teacher': 'Teacher'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.selectedRole = result.value;
        // Envoyer le rôle sélectionné au backend pour traitement
        this.authService.saveUserRole(this.selectedRole).subscribe((response)=>{
          if (response.isUpdated == true) {
            if (this.selectedRole ==="Student") {
              this.router.navigate(["homeStepper"]);
            } else {
              this.router.navigate(["test"]);
            }            
          } else {
            this.router.navigate(["signup"]);
          }
        });
      }
    });
  }
  


}
