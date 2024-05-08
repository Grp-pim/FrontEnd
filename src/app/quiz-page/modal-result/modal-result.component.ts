import { Component, Input, OnInit, input } from '@angular/core';

@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.component.html',
  styleUrls: ['./modal-result.component.css'],
})
export class ModalResultComponent implements OnInit {
  @Input() overallScore: any;
  constructor() {}
  ngOnInit(): void {}
}