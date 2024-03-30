import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-multi-step-progress-bar',
  templateUrl: './multi-step-progress-bar.component.html',
  styleUrls: ['./multi-step-progress-bar.component.css']
})
export class MultiStepProgressBarComponent implements OnInit {

  circles!: NodeListOf<Element>;
  progressBar!: HTMLElement;
  buttons!: NodeListOf<HTMLButtonElement>; // Modification du type des éléments de bouton
  currentStep = 0;

  constructor() { }

  ngOnInit(): void {
    this.circles = document.querySelectorAll(".circle");
    this.buttons = document.querySelectorAll("button");
    this.progressBar = document.querySelector(".indicator")!; // Utilisation de ! pour indiquer que progressBar ne sera pas null
    if (this.progressBar) {
      // add click event listeners to all buttons
      this.buttons.forEach((button: HTMLButtonElement) => { // Spécification du type HTMLButtonElement
        button.addEventListener("click", this.updateSteps.bind(this));
      });
    }

    // add click event listeners to all circles
    this.circles.forEach((circle: Element, index: number) => {
      circle.addEventListener("click", () => {
        this.currentStep = index + 1; // Mettre à jour currentStep en fonction de l'index du cercle cliqué
        this.updateProgressBar(); // Mettre à jour les cercles et la barre de progression
      });
    });
  }

  updateSteps(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.id === "next") {
      if (this.currentStep < this.circles.length) {
        this.currentStep++; // Passer à l'étape suivante uniquement si ce n'est pas la dernière étape
      }
    } else if (target.id === "prev") {
      if (this.currentStep > 1) {
        this.currentStep--; // Revenir à l'étape précédente uniquement si ce n'est pas la première étape
      }
    }
  
    this.updateProgressBar(); // Mettre à jour les cercles et la barre de progression
  }

  updateProgressBar(): void {
    // Mettre à jour la classe "active" des cercles
    this.circles.forEach((circle: Element, index: number) => {
      circle.classList.toggle("active", index < this.currentStep);
    });
  
    // Mettre à jour la largeur de la barre de progression
    this.progressBar.style.width = `${((this.currentStep - 1) / (this.circles.length - 1)) * 100}%`;
  
    // Désactiver le bouton "Next" s'il s'agit de la dernière étape, sinon l'activer
    this.buttons[1].disabled = (this.currentStep === this.circles.length);
  
    // Désactiver le bouton "Prev" s'il s'agit de la première étape, sinon l'activer
    this.buttons[0].disabled = (this.currentStep === 1);
  }
}
