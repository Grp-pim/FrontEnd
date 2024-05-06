import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersTableAdminComponent } from './users-table-admin.component';

describe('UsersTableAdminComponent', () => {
  let component: UsersTableAdminComponent;
  let fixture: ComponentFixture<UsersTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersTableAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
