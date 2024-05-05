import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridClienteComponent } from './grid-cliente.component';

describe('GridClienteComponent', () => {
  let component: GridClienteComponent;
  let fixture: ComponentFixture<GridClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridClienteComponent]
    });
    fixture = TestBed.createComponent(GridClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
