import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMaquinaComponent } from './grid-maquina.component';

describe('GridMaquinaComponent', () => {
  let component: GridMaquinaComponent;
  let fixture: ComponentFixture<GridMaquinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridMaquinaComponent]
    });
    fixture = TestBed.createComponent(GridMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
