import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-hint-modal',
  templateUrl: './hint-modal.component.html',
  styleUrls: ['./hint-modal.component.css'],
})
export class HintModalComponent {
  @Input() hintContent: string = ''; // Input property to receive hint content from parent component
  @Output() closeModalEvent = new EventEmitter(); // Output event to notify parent component to close the modal
  closeModal() {
    this.closeModalEvent.emit();
  }
  constructor() {}
}
