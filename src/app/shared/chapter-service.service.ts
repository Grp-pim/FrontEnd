import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterServiceService {
  private chapters: any[] = [];
  private currentChapterSubject: BehaviorSubject<number> = new BehaviorSubject<number>(1);
  public currentChapter$: Observable<number> = this.currentChapterSubject.asObservable();

  constructor() { }

  setCurrentChapter(chapterNumber: number) {
    this.currentChapterSubject.next(chapterNumber);
  }
  
  setChapters(chapters: any[]) {
    this.chapters = chapters;
  }

  getChapters() {
    return this.chapters;
  }
}