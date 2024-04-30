import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  user: any;

  profileImage: string = 'https://bootdey.com/img/Content/avatar/avatar3.png';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  isLoggedIn() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      this.user = this.decodeToken(jwt);
    }
    return !!jwt;
  }

  isGoogleLoggedIn() {
    const jwt = sessionStorage.getItem('token');
    if (jwt) {
      const decodedToken: any = this.decodeToken(jwt);
      return decodedToken.googleId !== undefined; // Vérifie si GoogleId est présent dans le JWT
    }
    return false;
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }

  logOut() {
    sessionStorage.removeItem('token');
    this.router.navigate(['']);
  }
}
