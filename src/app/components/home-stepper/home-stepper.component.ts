import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ChapterServiceService } from '../../shared/chapter-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-stepper',
  templateUrl: './home-stepper.component.html',
  styleUrls: ['./home-stepper.component.css']
})
export class HomeStepperComponent implements OnInit {

  chapters: any[] = [];
  currentChapter: number = 1;
  @Input() chapterActivationState: boolean[] = [];
  @Output() navigateToChapter: EventEmitter<number> = new EventEmitter<number>();

  constructor(private chapterService: ChapterServiceService, private router: Router) { }

  ngOnInit(): void {
    this.chapters = this.chapterService.getChapters();
    this.chapterService.currentChapter$.subscribe(chapterNumber => {
      this.currentChapter = chapterNumber;
    });
    this.navigateToChapter.subscribe(chapterNumber => {
      this.router.navigate(['/compilator', chapterNumber]);
    });
  }

  goToChapter(chapterNumber: number): void {
    if (this.chapterActivationState[chapterNumber - 1]) {
      this.navigateToChapter.emit(chapterNumber);
    }
  }

  navigateToCompilator(chapterNumber: number): void {
    this.router.navigate(['/compilator', chapterNumber]); // Naviguer vers /compilator/chapitre_number
  }

  
}