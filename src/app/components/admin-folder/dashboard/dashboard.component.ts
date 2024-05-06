import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any;

  profileImage: string = 'https://bootdey.com/img/Content/avatar/avatar3.png';

  // to navigate with sidebar
  selectedTab: string = 'Dashboard';
  changeTab(tabName: string) {
    this.selectedTab = tabName;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user = this.decodeToken(jwt);
    }
    return !!jwt;
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}
