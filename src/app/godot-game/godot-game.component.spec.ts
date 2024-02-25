import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GodotGameComponent } from './godot-game.component';

describe('GodotGameComponent', () => {
  let component: GodotGameComponent;
  let fixture: ComponentFixture<GodotGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GodotGameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GodotGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
