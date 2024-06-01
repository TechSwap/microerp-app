import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDepartamentosComponent } from './grid-departamentos.component';

describe('GridDepartamentosComponent', () => {
  let component: GridDepartamentosComponent;
  let fixture: ComponentFixture<GridDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridDepartamentosComponent]
    });
    fixture = TestBed.createComponent(GridDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
