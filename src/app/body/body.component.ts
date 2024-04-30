import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HintModalComponent } from '../hint-modal/hint-modal.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
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
  codeExecutionSuccess: boolean = false; // Flag to track code execution success
  nextChapterButtonClicked: boolean = false; // Flag to track if the next chapter button has been clicked
  hintContent: string = 'aaaa';
  disableNextButton: boolean = true;
  disablePreviousButton: boolean = true;
  closeModal: any; // Define the type according to your requirement
  loading: boolean = false;
  constructor(
    private apiService: ApiService,
    private sharedService: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getAllChapters();
    this.getRandomTask(this.currentChapter);
    this.spinner.show();
    this.previousChapter = this.currentChapter;
    // Initialiser l'état de chaque chapitre à false au début
    this.chapterStates = Array(this.chapters.length).fill(false);
  }

  // Method to execute code
/*
   executeUserCode() {
    this.loading = true;
    this.apiService.executeCode(this.code).subscribe({
      next: (response) => {
        this.executionResult = response.success
          ? response.output
          : `Error: ${response.error}`;
        // Trigger game start with autoPlay based on success
        this.sharedService.triggerStartGame(response.success);
        if (response.success) {
          this.codeExecutionSuccess = true;
          this.nextChapterButtonClicked = false; // Reset the flag only when execution is successful
        }
        this.loading = false;
      },
      error: (httpErrorResponse) => {
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
        // Trigger game start without autoPlay in case of HTTP error
        this.sharedService.triggerStartGame(false);
        this.loading = false;
      },
    });
  }*/
  executeUserCode() {
    this.loading = true;
    this.apiService.executeCode(this.code).subscribe({
      next: (response) => {
        this.executionResult = response.success
          ? response.output
          : `Error: ${response.error}`;
        this.sharedService.triggerStartGame(response.success);
        if (response.success) {
          this.loading = false;
          // Vérifier si la sortie contient le message de succès des tests
          if (response.output.includes("Tests success, Congrats!")) {
            // Marquer le code comme réussi
            this.codeExecutionSuccess = true;
            // Mettre à jour l'état du chapitre actuel comme terminé
            this.chapterStates[this.currentChapter - 1] = true;
          } else {
            // Réinitialiser le succès de l'exécution du code si les tests ne réussissent pas
            this.codeExecutionSuccess = false;
            // Afficher un message dans un popup indiquant l'échec des tests
            this.showFailedTestsPopup();
          }
        }
      },
      error: (httpErrorResponse) => {
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
        this.sharedService.triggerStartGame(false);
        this.errorTry++;
        this.loading = false;
        if (this.errorTry >= 2) {
          this.showHintButton = true;
        }
      },
    });
  }
  
  fetchNextChapterTask() {
    // Activer le bouton Next et naviguer vers le prochain chapitre si l'exécution du code a réussi
    if (this.codeExecutionSuccess) {
      this.disableNextButton = false;
      this.disablePreviousButton = false; // Activer le bouton Previous aussi
      this.nextChapterButtonClicked = true;
      this.previousChapter = this.currentChapter;
      this.currentChapter++;
      this.codeExecutionSuccess = false;
      // Mise à jour de l'état du nouveau chapitre comme non terminé
      this.chapterStates[this.currentChapter - 1] = false;
      this.getRandomTask(this.currentChapter);
    } else {
      // Désactiver le bouton Next si l'exécution du code a échoué
      this.disableNextButton = true;
      this.disablePreviousButton = false; // Activer le bouton Previous
      this.nextChapterButtonClicked = false;
    }
  }
  

  // Fonction pour afficher un popup indiquant l'échec des tests
  showFailedTestsPopup() {
    // Utiliser la fonction confirm pour afficher une boîte de dialogue avec un message
    if (confirm("Test failed. Do you want to try again?")) {
      // Si l'utilisateur clique sur "OK", rafraîchir la tâche actuelle
      this.refreshTask();
    }
  }

 // Méthode pour rafraîchir la tâche actuelle
 refreshTask() {
  // Implémentez le rafraîchissement de la tâche ici
  this.getRandomTask(this.currentChapter);
}

getRandomTask(currentChapter: number): void {
  this.executionResult = '';
  this.nextChapterButtonClicked = false; // Réinitialiser le drapeau
  // Vérifier si la tâche actuelle a déjà été marquée comme réussie
  if (this.chapterStates[currentChapter - 1]) {
    // Si la tâche est déjà marquée comme réussie, ne récupérez pas une nouvelle tâche
    return;
  }
  // Sinon, récupérez une nouvelle tâche
  this.apiService.getRandomTask(currentChapter).subscribe(
    (task: any) => {
      this.randomTask = task; // Assigner l'objet de tâche reçu à la propriété randomTask
      this.code = task.initialCode;
    },
    (error: any) => {
      console.error('Error fetching random task:', error);
      // Gérer l'erreur de manière appropriée
    }
  );
}

  openModal() {
    const modalRef = this.modalService.open(HintModalComponent);
    // Optionally, pass data to the modal component
    modalRef.componentInstance.hintContent = this.randomTask.hint;
  }
  refreshRoute() {
    // Navigate to the current route with the option to skip the location change
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      // Navigate to the current route again to trigger a refresh
      this.router.navigate([this.router.url]);
      console.log('refreshing');
    });
  }

  /*fetchNextChapterTask() {
    if (!this.nextChapterButtonClicked && this.codeExecutionSuccess) {
      this.nextChapterButtonClicked = true; // Set flag to true to prevent multiple clicks
      this.currentChapter++;
      this.codeExecutionSuccess = false; // Reset code execution success flag
      this.getRandomTask(this.currentChapter);
    }
  }*/
  // for sidebar
  getAllChapters() {
    this.apiService.getAllChapters().subscribe(
      (data) => {
        // console.log(data); // Check the retrieved data
        this.chapters = data; // Adjust based on the actual structure
      },
      (error) => {
        console.log('error fetching', error);
      }
    );
  }
  
  
  

  fetchPreviousChapterTask() {
    if (this.currentChapter > 1) {
      // Activer le bouton Previous si le chapitre actuel est supérieur à 1
      this.disablePreviousButton = false;
      this.previousChapter = this.currentChapter;
      this.currentChapter--;
      this.getRandomTask(this.currentChapter);
      this.codeExecutionSuccess = false;
      this.nextChapterButtonClicked = false;
    } else {
      // Désactiver le bouton Previous si le chapitre actuel est 1
      this.disablePreviousButton = true;
    }
  }
}
