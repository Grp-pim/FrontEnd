import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private currentChapterSubject = new BehaviorSubject<number>(1);
  currentChapter$ = this.currentChapterSubject.asObservable();

  private startGameSubject = new Subject<boolean>();

  constructor() {}


  setCurrentChapter(chapter: number) {
    this.currentChapterSubject.next(chapter);
  }

  triggerStartGame(autoPlay: boolean): void {
    this.startGameSubject.next(autoPlay);
  }

  getStartGameObservable(): Observable<boolean> {
    return this.startGameSubject.asObservable();
  }

  fetchNextChapterTask(): void {
    // Émettre le prochain numéro de chapitre
    const currentChapter = this.currentChapterSubject.value;
    this.currentChapterSubject.next(currentChapter + 1);
  }

  fetchPreviousChapterTask(): void {
    // Émettre le numéro de chapitre précédent si possible
    const currentChapter = this.currentChapterSubject.value;
    if (currentChapter > 1) {
      this.currentChapterSubject.next(currentChapter - 1);
    }
  }
}


