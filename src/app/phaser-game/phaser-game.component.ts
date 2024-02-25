import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';

declare var Phaser: any;

@Component({
  selector: 'app-phaser-game',
  templateUrl: './phaser-game.component.html',
  styleUrls: ['./phaser-game.component.css'],
})
export class PhaserGameComponent implements OnInit, OnDestroy {
  @ViewChild('phaserRender', { static: true })
  phaserRender!: ElementRef<HTMLDivElement>;

  game: any; // Use 'any' type for Phaser game instance if TypeScript types are not available

  constructor() {}

  ngOnInit(): void {
    console.log('Initializing Phaser game');
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      backgroundColor: '#18216D',
      parent: this.phaserRender.nativeElement,
      scene: {
        preload: this.preload,
        create: this.create,
        update: this.update,
      },
      // Additional configurations...
    };

    this.game = new Phaser.Game(config);
  }
  ngOnDestroy(): void {
    console.log('Destroying Phaser game');
    if (this.game && this.game.destroy) {
      this.game.destroy(true);
    }
  }

  preload() {
    // Phaser preload method
  }

  create() {
    // Phaser create method
  }

  update() {
    // Phaser update method
  }
}
