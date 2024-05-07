import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  GoogleURL: string ="http://localhost:3000/api/user";

  constructor(private http: HttpClient) { }

  // Méthode pour rediriger l'utilisateur vers Google pour l'authentification OAuth
  redirectToGoogle(): void {
    window.location.href = `${this.GoogleURL}/auth/google`;
  }
  
  // Méthode pour gérer la réponse de Google après l'authentification réussie
  handleGoogleCallback(): Observable<any> {
    return this.http.get<any>(`${this.GoogleURL}/auth/google/callback`);
  }

  // ************************************  GITHUB **************************
  redirectToGitHub(): void {
    window.location.href =`${this.GoogleURL}/auth/github`;
  }
  
  handleGitHubCallback(): Observable<any> {
    return this.http.get<any>(`${this.GoogleURL}/auth/github/callback`);
  }

  // ***************************************************************************

  saveUserRole(selectedRole: any) {
    return this.http.patch<{ isUpdated: boolean }>(`${this.GoogleURL}/save/role`, { role: selectedRole });
  }  


}