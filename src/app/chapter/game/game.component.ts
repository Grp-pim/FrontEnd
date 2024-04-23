import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

interface Position {
  x: number;
  y: number;
}
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  @ViewChild('canvas', { static: true }) canvasRef: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D;
  Direction = {
    Right: 0,
    Left: 1,
    Down: 2,
    Up: 3
  };

  constructor() { }

  ngOnInit(): void {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 500;
    canvas.height = 500;
    this.ctx = canvas.getContext('2d');
    this.startGame();
  }

  startGame() {
    const snake = new Snake(this.ctx, this.Direction);
    snake.startGame();
  }
}

function Snake(ctx: CanvasRenderingContext2D, Direction: any) {
  this.speed = 10;
  this.food = {};

  this.init = function () {
    ctx.font = "25px Comic Sans MS";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    const initialX = Math.floor(Math.random() * (ctx.canvas.width / 10)) * 10;
    const initialY = Math.floor(Math.random() * (ctx.canvas.height / 10)) * 10;
    this.tail = [{ x: initialX, y: initialY }];
    for (let i = 1; i < 5; i++) {
      this.tail.push({ x: initialX - i * 10, y: initialY });
    }
    this.direction = Direction.Right;
    this.score = 0;
    this.gameOver = false;
    this.willEat = false;
  };

  this.startGame = () => {
    this.init();
    this.move();
    this.foodGenerator();
  };

  this.setDirection = (direction) => {
    this.direction = direction;
  };

  this.draw = () => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // draw score
    ctx.fillStyle = '#fff';
    ctx.globalAlpha = 0.5;
    ctx.fillText('Score : ' + this.score, 70, 30);

    ctx.globalAlpha = 1;
    // draw food
    ctx.fillStyle = '#4B8D48';
    ctx.beginPath();
    ctx.rect(this.food.x, this.food.y, 10, 10);
    ctx.fill();

    // draw snake
    this.tail.forEach((item, index) => {
      if (index % 2 === 0) {
        ctx.fillStyle = '#A1CCA5';
      } else {
        ctx.fillStyle = '#415D43';
      }
      ctx.beginPath();
      ctx.rect(item.x, item.y, 10, 10);
      ctx.fill();
    });

    this.isDead();

    this.eatFood();
  };

  this.move = () => {
    const head = { ...this.tail[this.tail.length - 1] };
    const newHead = head;
    switch (this.direction) {
      case Direction.Right:
        newHead.x = (head.x + 10 === ctx.canvas.width) ? 0 : head.x + this.speed;
        break;
      case Direction.Left:
        newHead.x = (head.x === 0) ? (ctx.canvas.width - 10) : head.x - this.speed;
        break;
      case Direction.Down:
        newHead.y = (head.y + 10 === ctx.canvas.height) ? 0 : head.y + this.speed;
        break;
      case Direction.Up:
        newHead.y = (head.y === 0) ? (ctx.canvas.height - 10) : head.y - this.speed;
        break;
    }
    if (!this.willEat) {
      this.tail.shift();
    } else {
      this.willEat = !this.willEat;
    }

    this.tail.push(newHead);
    this.draw();

    setTimeout(() => {
      if (!this.gameOver) {
        this.move(); // Change here: use this.move() instead of window.requestAnimationFrame(this.move);
      } else {
        ctx.fillStyle = '#fff';
        ctx.globalAlpha = 1;
        ctx.fillText('Game Over', ctx.canvas.width / 2, ctx.canvas.height / 2);
        ctx.fillText('Press Enter to Restart', ctx.canvas.width / 2, ctx.canvas.height / 2 + 30);
      }

    }, 1000 / (30 + this.score / 2));
  };

  this.isDead = () => {
    const head = { ...this.tail[this.tail.length - 1] };
    this.tail.forEach((item, index) => {
      if (index === this.tail.length - 1) {
        return;
      } else if ((head.x === item.x && head.y === item.y)) {
        this.gameOver = true;
      }
    });
  };

  this.foodGenerator = () => {
    let foodX, foodY;
    do {
        foodX = Math.floor(Math.random() * (ctx.canvas.width / 10)) * 10;
        foodY = Math.floor(Math.random() * (ctx.canvas.height / 10)) * 10;
    } while (this.isFoodTooCloseToSnake(foodX, foodY));

    this.food['x'] = foodX;
    this.food['y'] = foodY;
  };

  this.isFoodTooCloseToSnake = (foodX: number, foodY: number): boolean => {
    const minDistance = 20; // Adjust as needed
    for (let i = 0; i < this.tail.length; i++) {
        const segment = this.tail[i];
        const dx = Math.abs(segment.x - foodX);
        const dy = Math.abs(segment.y - foodY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            return true; // Food is too close to snake
        }
    }
    return false; // Food is at a safe distance from the snake
  };

  this.eatFood = () => {
    const head = { ...this.tail[this.tail.length - 1] };
    if (head.x === this.food.x && head.y === this.food.y) {
      this.willEat = true;
      this.score += 1;
      this.foodGenerator();
    }
  };
}
