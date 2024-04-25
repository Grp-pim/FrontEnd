import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }

  // Méthode pour rediriger l'utilisateur vers Google pour l'authentification OAuth
  redirectToGoogle(): void {
    window.location.href = 'http://localhost:3000/api/user/auth/google';
  }
  
  // Méthode pour gérer la réponse de Google après l'authentification réussie
  handleGoogleCallback(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/api/user/auth/google/callback');
  }


}