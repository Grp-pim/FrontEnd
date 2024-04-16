import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jwt_decode from 'jwt-decode';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-security',
  templateUrl: './profile-security.component.html',
  styleUrls: ['./profile-security.component.css']
})
export class ProfileSecurityComponent implements OnInit {

  pwdForm! : FormGroup;
  userId!:  string;
  
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.pwdForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]]
    });

    // Recupere ID du Token
    const token = sessionStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    this.userId = decodedToken._id;
  }

  updatePwd(){
    const { currentPassword, newPassword } = this.pwdForm.value;
    
    this.userService.updatePassword(this.userId, currentPassword, newPassword).subscribe(
      (response) => {
        console.log("Password updated successfully", response.msg);
        // Réinitialisez le formulaire après la mise à jour du mot de passe
        this.pwdForm.reset();
      },
      (error) => {
        console.error("Error updating password:", error);
      }
    );
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

}
