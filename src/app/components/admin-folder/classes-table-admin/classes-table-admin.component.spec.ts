import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesTableAdminComponent } from './classes-table-admin.component';

describe('ClassesTableAdminComponent', () => {
  let component: ClassesTableAdminComponent;
  let fixture: ComponentFixture<ClassesTableAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClassesTableAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassesTableAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
