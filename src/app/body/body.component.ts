import {
  Component,
  ElementRef,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { ApiService } from '../services/api.service'; // Adjust the path as needed
@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrl: './body.component.css',
})
export class BodyComponent implements OnInit, OnDestroy {
  editorOptions = { theme: 'vs-dark', language: 'java' };
  code: string = `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`;

  executionResult: string = '';
  private verificationInterval: any;

  constructor(
    private apiService: ApiService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Start any game initialization logic here
  }

  ngOnDestroy() {
    // Clean up the game interval to avoid memory leaks
    clearInterval(this.verificationInterval);
  }



  // Method to execute code
  executeUserCode() {
    this.apiService.executeCode(this.code).subscribe({
      next: (response) => {
        // Check if the response indicates success
        if (response.success) {
          this.executionResult = response.output;
        } else {
          // If success is false, display the error message
          this.executionResult = `Error: ${response.error}`;
        }
      },
      error: (httpErrorResponse) => {
        // Handle any errors that occur during the HTTP request
        this.executionResult = `Error: ${httpErrorResponse.error.error}`;
      },
    });
  }
  sauter() {
    const perso = this.el.nativeElement.querySelector('.perso');
    if (!perso.classList.contains('animation')) {
      this.renderer.addClass(perso, 'animation');
      setTimeout(() => {
        this.renderer.removeClass(perso, 'animation');
      }, 500);
    }
  }

  startGame() {
    // Assuming you call this method to start the game or as part of ngOnInit
    this.verificationInterval = setInterval(() => {
      const perso = this.el.nativeElement.querySelector('.perso');
      const obstacles = this.el.nativeElement.querySelector('.obstacles');
      const persoTop = parseInt(window.getComputedStyle(perso).getPropertyValue("top"));
      const obstaclesLeft = parseInt(window.getComputedStyle(obstacles).getPropertyValue("left"));

      if (obstaclesLeft < 20 && obstaclesLeft > 0 && persoTop >= 130) {
        obstacles.style.animation = "none";
        alert("Vous avez perdu");
        clearInterval(this.verificationInterval); // Important to clear this to avoid memory leaks
      }
    }, 10); // Adjusted the interval for performance reasons
  }
}
