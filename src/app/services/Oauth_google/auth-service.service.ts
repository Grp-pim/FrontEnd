import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  GoogleURL: string ="http://localhost:3000/api/user";

  constructor(private http: HttpClient, private router: Router) { }

  // Méthode pour rediriger l'utilisateur vers Google pour l'authentification OAuth
  redirectToGoogle(): void {
    window.location.href = `${this.GoogleURL}/auth/google`;
  }
  
  // Méthode pour gérer la réponse de Google après l'authentification réussie
  handleGoogleCallback(): Observable<any> {
    return this.http.get<any>(`${this.GoogleURL}/auth/google/callback`);
  }

  saveUserRole(selectedRole: any) {
    return this.http.patch<{ isUpdated: boolean }>(`${this.GoogleURL}/save/role`, { role: selectedRole });
  }  


}