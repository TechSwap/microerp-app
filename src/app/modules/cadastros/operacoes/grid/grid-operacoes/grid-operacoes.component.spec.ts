import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOperacoesComponent } from './grid-operacoes.component';

describe('GridOperacoesComponent', () => {
  let component: GridOperacoesComponent;
  let fixture: ComponentFixture<GridOperacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridOperacoesComponent]
    });
    fixture = TestBed.createComponent(GridOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
