import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProdutoComponent } from './grid-produto.component';

describe('GridProdutoComponent', () => {
  let component: GridProdutoComponent;
  let fixture: ComponentFixture<GridProdutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridProdutoComponent]
    });
    fixture = TestBed.createComponent(GridProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
