import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListtaksComponent } from './listtaks.component';

describe('ListtaksComponent', () => {
  let component: ListtaksComponent;
  let fixture: ComponentFixture<ListtaksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListtaksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListtaksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
