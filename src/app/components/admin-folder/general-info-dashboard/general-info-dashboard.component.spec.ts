import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoDashboardComponent } from './general-info-dashboard.component';

describe('GeneralInfoDashboardComponent', () => {
  let component: GeneralInfoDashboardComponent;
  let fixture: ComponentFixture<GeneralInfoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
