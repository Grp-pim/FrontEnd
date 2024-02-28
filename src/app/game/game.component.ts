import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'], // Changed to styleUrls and made it an array
})
export class GameComponent implements OnInit {
  autoPlay: boolean = false;
  private autoJumpInterval: any;

  @ViewChild('character') characterRef!: ElementRef;
  @ViewChild('block') blockRef!: ElementRef;
  score: number = 0;
  counter: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.sharedService.getStartGameObservable().subscribe((autoPlay) => {
      this.autoPlay = autoPlay;
      if (this.autoPlay) {
        this.startAutoPlay();
      }
    });
  }
  ngOnDestroy(): void {
    if (this.autoJumpInterval) {
      clearInterval(this.autoJumpInterval);
    }
    // Also unsubscribe from SharedService observable if necessary
  }
  startAutoPlay(): void {
    const checkAndJumpInterval = setInterval(() => {
      if (!this.autoPlay) {
        clearInterval(checkAndJumpInterval);
      }

      // Get the current left position of the block
      let block = this.blockRef.nativeElement;
      let blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue('left')
      );

      // Define a threshold for when to jump (e.g., when the block is 100px away from the character)
      const jumpThreshold = 100;

      if (blockLeft < jumpThreshold && blockLeft > 0) {
        this.jump();
      }

      // Optionally, adjust or refine the conditions for stopping the interval or game logic
    }, 10); // This checks the condition every 10 milliseconds
  }

  jump(): void {
    if (isPlatformBrowser(this.platformId)) {
      let character = this.characterRef.nativeElement;
      if (character.classList.contains('animate')) {
        return;
      }
      character.classList.add('animate');
      setTimeout(() => character.classList.remove('animate'), 300);
      this.startGame(); // Optionally, start or continue the game logic here.
    }
  }

  startGame(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Ensure the game interval is not started multiple times.
      if (!this.counter) {
        setInterval(() => this.checkDead(), 10);
      }
    }
  }

  checkDead(): void {
    if (isPlatformBrowser(this.platformId)) {
      let character = this.characterRef.nativeElement;
      let block = this.blockRef.nativeElement;
      let characterTop = parseInt(
        window.getComputedStyle(character).getPropertyValue('top')
      );
      let blockLeft = parseInt(
        window.getComputedStyle(block).getPropertyValue('left')
      );
      if (blockLeft < 20 && blockLeft > -20 && characterTop >= 130) {
        block.style.animation = 'none';
        alert(`Game Over. score: ${Math.floor(this.counter / 100)}`);
        this.counter = 0;
        block.style.animation = 'block 1s infinite linear';
      } else {
        this.counter++;
        this.score = Math.floor(this.counter / 100);
      }
    }
  }
}
