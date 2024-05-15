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
  handleGoogleCallback(code: string): Observable<any> {
    return this.http.get<any>(`/api/user/auth/google/callback?code=${code}`);
  }
  
  handleGitHubCallback(code: string): Observable<any> {
    return this.http.get<any>(`/api/user/auth/github/callback?code=${code}`);
  }


  // ************************************  GITHUB **************************
  redirectToGitHub(): void {
    window.location.href =`${this.GoogleURL}/auth/github`;
  }

  // ***************************************************************************

  saveUserRole(selectedRole: any) {
    return this.http.patch<{ isUpdated: boolean }>(`${this.GoogleURL}/save/role`, { role: selectedRole });
  }  


}