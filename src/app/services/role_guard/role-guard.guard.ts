import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

  user: any;

  constructor(
    private router: Router
  ) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const expectedRole = next.data['role'];

    // Vérifier si l'utilisateur est connecté
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }

    // Vérifier si l'utilisateur a le rôle attendu
    if (this.user.role !== expectedRole) {
      this.router.navigate(['**']); 
      return false;
    }
    
    return true;
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

  
}
