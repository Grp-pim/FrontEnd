import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent {
  @Input() currentChapterNumber: number = 1;
  @Input() totalChapter: number = 5;// Ajoutez cette ligne pour déclarer la propriété chapters
  @Output() nextChapter: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousChapter: EventEmitter<void> = new EventEmitter<void>();
  

  constructor() { }

  ngOnInit(): void {
  }
}
