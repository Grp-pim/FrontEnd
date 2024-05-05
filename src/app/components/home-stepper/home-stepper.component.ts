import { Component, Input, OnInit } from '@angular/core';
import { ChapterServiceService } from '../../shared/chapter-service.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home-stepper',
  templateUrl: './home-stepper.component.html',
  styleUrls: ['./home-stepper.component.css']
})
export class HomeStepperComponent implements OnInit {

  chapters: any[] = []; // Assurez-vous d'initialiser la liste des chapitres
  currentChapter: number = 1; // Ajoutez la variable currentChapter
  @Input() chapterActivationState: boolean[] = [];
  

  constructor( private chapterService: ChapterServiceService, private router: Router
  ) { }

  navigateToChapter(chapterNumber: number) {
    this.router.navigate(['/compilator', chapterNumber]);
  }
  
  ngOnInit(): void {
  this.chapters = this.chapterService.getChapters();
  this.chapterService.currentChapter$.subscribe(chapterNumber => {
    this.currentChapter = chapterNumber;
  });
  }
  goToNextChapter() {
    if (this.currentChapter < this.chapters.length) {
      const nextChapter = this.currentChapter + 1;
      this.navigateToChapter(nextChapter);
    }
  }
}
  
