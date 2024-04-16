import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-quiz',
  templateUrl: './sidebar-quiz.component.html',
  styleUrls: ['./sidebar-quiz.component.css'],
})
export class SidebarQuizComponent implements OnInit {
  sidebarVisible: boolean = false;
  @Input() testt: any;
  @Input() currentTaskIndex: number = 0;
  constructor() {}

  ngOnInit(): void {
  }
  changeTask(index: number) {
    this.currentTaskIndex = index;
  }
}
