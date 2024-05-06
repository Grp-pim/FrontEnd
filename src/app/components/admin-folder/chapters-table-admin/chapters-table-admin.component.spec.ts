import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChaptersTableAdminComponent } from './chapters-table-admin.component';

describe('ChaptersTableAdminComponent', () => {
  let component: ChaptersTableAdminComponent;
  let fixture: ComponentFixture<ChaptersTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChaptersTableAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChaptersTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
