import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private googleAuthUrl = 'http://localhost:3000/api/user/auth/google/url';
  private googleCallbackUrl = 'http://localhost:3000/api/user/auth/google/callback';

  constructor(private http: HttpClient) { }

  getGoogleAuthUrl(): Observable<{ url: string }> {
    return this.http.get<{ url: string }>(this.googleAuthUrl);
  }

  handleGoogleCallback(code: string, role: string): Observable<any> {
    const url = `${this.googleCallbackUrl}?code=${code}&role=${role}`;
    return this.http.get<any>(url);
  }


}