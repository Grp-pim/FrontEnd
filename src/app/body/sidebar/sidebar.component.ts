import { Component, Input} from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarVisible: boolean = false;
  @Input() chapters: any[] = [];
  @Input() currentChapter :number = 0;

  constructor() {}

  ngOnInit(): void {}
}
