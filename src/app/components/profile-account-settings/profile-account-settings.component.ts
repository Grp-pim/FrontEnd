import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-profile-account-settings',
  templateUrl: './profile-account-settings.component.html',
  styleUrls: ['./profile-account-settings.component.css']
})
export class ProfileAccountSettingsComponent implements OnInit {

  id!: string;

  constructor(
    private userService: UserService,
    private router : Router,
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    this.id = decodedToken._id;
  }

  deleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      this.userService.deleteUserProfile(this.id).subscribe(
        (response) => {
          console.log(response.msg);
          sessionStorage.removeItem('token');
          this.router.navigate([""]);
        },
        (error) => {
          console.error("Error deleting user account:", error);
        }
      );
    }
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

}
