import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFuncionarioComponent } from './grid-funcionario.component';

describe('GridFuncionarioComponent', () => {
  let component: GridFuncionarioComponent;
  let fixture: ComponentFixture<GridFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridFuncionarioComponent]
    });
    fixture = TestBed.createComponent(GridFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
