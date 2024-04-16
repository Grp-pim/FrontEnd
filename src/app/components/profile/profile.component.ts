import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  fullName: string = '';
  role: string = '';
  profileImage: string = 'https://bootdey.com/img/Content/avatar/avatar3.png';

  selectedTab: string = 'profileInformation';
  
  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }

  constructor(
    private router : Router,
  ) { }

  ngOnInit(): void {
    const token = sessionStorage.getItem('token');
    const decodedToken = this.decodeToken(token!);
    this.fullName = decodedToken.fullName;
    this.role = decodedToken.role;
    this.profileImage = decodedToken.image || this.profileImage;
  }

  // exit account
  logOut(){
    sessionStorage.removeItem('token');
    this.router.navigate([""]);
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }


}
