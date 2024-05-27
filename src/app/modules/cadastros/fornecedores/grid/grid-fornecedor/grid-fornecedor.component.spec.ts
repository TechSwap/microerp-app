import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFornecedorComponent } from './grid-fornecedor.component';

describe('GridFornecedorComponent', () => {
  let component: GridFornecedorComponent;
  let fixture: ComponentFixture<GridFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridFornecedorComponent]
    });
    fixture = TestBed.createComponent(GridFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
