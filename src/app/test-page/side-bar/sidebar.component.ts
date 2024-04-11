import { Component, Input } from '@angular/core';
@Component({
  selector: 'app-sideBar',
  templateUrl: './sideBar.component.html',
  styleUrls: ['./sideBar.component.css'],
})
export class SideBarComponent {
  sidebarVisible: boolean = false;
  @Input() test: any;
  @Input() currentTaskIndex: number = 0;

  constructor() {}
  changeTask(index: number) {
    this.currentTaskIndex = index;
  }
  ngOnInit(): void {}
}
