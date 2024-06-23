import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridComprasComponent } from './grid-compras.component';

describe('GridComprasComponent', () => {
  let component: GridComprasComponent;
  let fixture: ComponentFixture<GridComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridComprasComponent]
    });
    fixture = TestBed.createComponent(GridComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
