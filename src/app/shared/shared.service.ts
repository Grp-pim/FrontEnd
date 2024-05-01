import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {


  private startGameSubject = new Subject<boolean>();

  constructor() {}


  triggerStartGame(autoPlay: boolean): void {
    this.startGameSubject.next(autoPlay);
  }

  getStartGameObservable(): Observable<boolean> {
    return this.startGameSubject.asObservable();
  }
  

}


