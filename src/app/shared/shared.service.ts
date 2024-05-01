import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private startGameSubject = new Subject<boolean>();
  private currentUserId: any;

  constructor() {}

  triggerStartGame(autoPlay: boolean): void {
    this.startGameSubject.next(autoPlay);
  }

  getStartGameObservable(): Observable<boolean> {
    return this.startGameSubject.asObservable();
  }

  sendCurrentUserid(): void {
    const token = sessionStorage.getItem('token');
    if (!token) {
      console.error('Token not found in sessionStorage');
      return;
    }

    // Decode the token to get the user ID
    const decodedToken = this.decodeToken(token);
    this.currentUserId = decodedToken._id;
    // console.log('Current User ID:', this.currentUserId);
  }
  getCurrentUserId(): string {
    return this.currentUserId;
  }

  decodeToken(token: string): any {
    return jwt_decode(token);
  }
}

