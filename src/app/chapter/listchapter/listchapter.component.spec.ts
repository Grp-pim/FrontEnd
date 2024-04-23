import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListchapterComponent } from './listchapter.component';

describe('ListchapterComponent', () => {
  let component: ListchapterComponent;
  let fixture: ComponentFixture<ListchapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListchapterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListchapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
