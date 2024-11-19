import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridProducaoComponent } from './grid-producao.component';

describe('GridProducaoComponent', () => {
  let component: GridProducaoComponent;
  let fixture: ComponentFixture<GridProducaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridProducaoComponent]
    });
    fixture = TestBed.createComponent(GridProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
