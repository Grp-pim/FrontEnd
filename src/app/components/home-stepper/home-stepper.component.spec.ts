import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeStepperComponent } from './home-stepper.component';

describe('HomeStepperComponent', () => {
  let component: HomeStepperComponent;
  let fixture: ComponentFixture<HomeStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeStepperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
