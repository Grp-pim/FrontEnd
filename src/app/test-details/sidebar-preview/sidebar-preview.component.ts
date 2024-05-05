import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar-preview',
  templateUrl: './sidebar-preview.component.html',
  styleUrls: ['./sidebar-preview.component.css'],
})
export class SidebarPreviewComponent implements OnInit {
  @Input() sidebarVisible: boolean = false;
  @Output() hide = new EventEmitter<void>();
  @Input() item: any;
  @Input() selectedItem:any;
  closeSidebar() {
    this.hide.emit();
  }
  ngOnInit(): void {}
}
