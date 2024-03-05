import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  img = 'https://ace.c9.io/doc/site/images/ace-logo.png';
  display = false;
  change() {
    this.display = !this.display;
  }
  person = [
    { name: 'bilel', age: 20 },
    { name: 'ali', age: 30 },
    { name: 'ahmed', age: 40 }
  ];
  color = 'red';
}
