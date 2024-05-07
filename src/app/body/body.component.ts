import { Component, OnInit, Output, EventEmitter } from '@angular/core';import { ApiService } from '../services/api.service';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from '../hint-modal/hint-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';
import { ChapterServiceService } from '../shared/chapter-service.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
})
export class BodyComponent implements OnInit {

  chapters: any[] = [];
  previousChapter: number = 0;
  totalChapter: number = this.chapters.length;
  randomTask: any;
  currentChapter: number = 1;
  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = '';
  errorTry: number = 0;
  showHintButton: boolean = false;
  chapterStates: boolean[] = [];
  executionResult: string = '';
  codeExecutionSuccess: boolean = false;
  nextChapterButtonClicked: boolean = false;
  hintContent: string = 'aaaa';
  disableNextButton: boolean = true;
  disablePreviousButton: boolean = true;
  closeModal: any;
  loading: boolean = false;
  currentChapterNumber: number = 1;
  currentChapterStatus: boolean = false;
  isNextChapterActive: boolean = false;
  @Output() nextChapter: EventEmitter<void> = new EventEmitter<void>();
  @Output() previousChapters: EventEmitter<void> = new EventEmitter<void>();
  @Output() chaptersChange: EventEmitter<any[]> = new EventEmitter<any[]>();
  @Output() currentChapterChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() chapterActivationState: EventEmitter<boolean[]> = new EventEmitter<boolean[]>();


  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef,
    private chapterService: ChapterServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getAllChapters();
    this.getRandomTask(this.currentChapter);
    this.spinner.show();
    this.previousChapter = this.currentChapter;
    this.chapterStates = Array(this.chapters.length).fill(false);
    this.route.params.subscribe(params => {
      this.currentChapter = +params['chapterNumber'];
    });
  }

  executeUserCode() {
    // this.loading = true;
     this.apiService.executeCode(this.code).subscribe({
       next: (response) => {
         this.executionResult = response.success
           ? response.output
           : `Error: ${response.error}`;
         this.sharedService.triggerStartGame(response.success);
         if (response.success) {
           this.loading = false;
           if (response.output.includes("Tests success, Congrats!")) {
             this.codeExecutionSuccess = true;
             this.chapterStates[this.currentChapter - 1] = true;
           } else {
             this.codeExecutionSuccess = false;
             this.showFailedTestsPopup();
           }
         }
       },
       error: (httpErrorResponse) => {
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
         this.sharedService.triggerStartGame(false);
         this.errorTry++;
         // Vérifier si l'erreur est une erreur de syntaxe (code d'état HTTP 400)
         if (httpErrorResponse.status !== 400) {
           // Vérifier si l'erreur est une erreur de compilation Java spécifique
           if (
             httpErrorResponse.error.error &&
             httpErrorResponse.error.error.includes("error: cannot find symbol")
           ) {
             this.loading = false; // Désactiver le chargement en cas d'erreur de compilation Java spécifique
           }
         }
         if (this.errorTry >= 2) {
           this.showHintButton = true;
         }
       },
     });
   }
   
   showFailedTestsPopup() {
     window.alert("Test failed. Do you want to try again?");
   }

  getRandomTask(currentChapter: number): void {
    this.executionResult = '';
    this.nextChapterButtonClicked = false;
    if (this.chapterStates[currentChapter - 1]) {
      return;
    }
    this.apiService.getRandomTask(currentChapter).subscribe(
      (task: any) => {
        this.randomTask = task;
        this.code = task.initialCode;
      },
      (error: any) => {
        console.error('Error fetching random task:', error);
      }
    );
  }

  openModal() {
    const modalRef = this.modalService.open(HintModalComponent);
    modalRef.componentInstance.hintContent = this.randomTask.hint;
  }

  refreshRoute() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
  fetchNextChapterTask() {
    if (this.codeExecutionSuccess && this.chapterStates[this.currentChapter - 1]) {
      this.disableNextButton = false;
      this.disablePreviousButton = false;
      this.nextChapterButtonClicked = true;
      this.previousChapter = this.currentChapter;
      this.codeExecutionSuccess = false;
      this.chapterStates[this.currentChapter - 1] = true;
      this.nextChapter.emit();
      this.chapterService.setCurrentChapter(this.currentChapter + 1);
      this.currentChapter++;
      this.getRandomTask(this.currentChapter);
      this.isNextChapterActive = true;
    } else {
      this.disableNextButton = true;
      this.disablePreviousButton = false;
      this.nextChapterButtonClicked = false;
    }
  }
  

fetchPreviousChapterTask() {
  if (this.currentChapter > 1) {
    this.disablePreviousButton = false;
    this.previousChapter = this.currentChapter;
    this.currentChapter--;
    this.chapterService.setCurrentChapter(this.currentChapter);
    this.getRandomTask(this.currentChapter);
    this.codeExecutionSuccess = false;
    this.nextChapterButtonClicked = false;
    this.previousChapters.emit();
  } else {
    this.disablePreviousButton = true;
  }
}
getAllChapters() {
  this.apiService.getAllChapters().subscribe(
    (data) => {
      this.chapters = data;
      this.emitChapterData();
      this.chapterService.setChapters(this.chapters); // Émettre les données après avoir obtenu les chapitres
    },
    (error) => {
      console.log('error fetching', error);
    }
  );
}

emitChapterData() {
  this.chaptersChange.emit(this.chapters);
  this.currentChapterChange.emit(this.currentChapter);
  this.chapterActivationState.emit(this.chapterStates); // Émettre l'état d'activation des chapitres
}

// Méthode pour vérifier si un chapitre est actif
isChapterActive(chapterNumber: number): boolean {
  // Vérifie si le chapitre est actif dans votre logique actuelle
  return this.currentChapter === chapterNumber && this.isNextChapterActive;
}
 // Méthode pour naviguer vers un chapitre depuis le HomeStepperComponent
 navigateToChapter(chapterNumber: number): void {
  this.router.navigate(['/compilator/', chapterNumber]);
} 


  
}