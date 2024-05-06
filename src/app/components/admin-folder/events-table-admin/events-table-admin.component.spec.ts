import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsTableAdminComponent } from './events-table-admin.component';

describe('EventsTableAdminComponent', () => {
  let component: EventsTableAdminComponent;
  let fixture: ComponentFixture<EventsTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventsTableAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
