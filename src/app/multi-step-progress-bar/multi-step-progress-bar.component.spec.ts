import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiStepProgressBarComponent } from './multi-step-progress-bar.component';

describe('MultiStepProgressBarComponent', () => {
  let component: MultiStepProgressBarComponent;
  let fixture: ComponentFixture<MultiStepProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiStepProgressBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiStepProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
