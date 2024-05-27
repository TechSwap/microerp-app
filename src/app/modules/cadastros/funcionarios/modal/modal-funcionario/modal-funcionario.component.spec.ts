import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFuncionarioComponent } from './modal-funcionario.component';

describe('ModalFuncionarioComponent', () => {
  let component: ModalFuncionarioComponent;
  let fixture: ComponentFixture<ModalFuncionarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFuncionarioComponent]
    });
    fixture = TestBed.createComponent(ModalFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
