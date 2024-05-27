import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFornecedorComponent } from './modal-fornecedor.component';

describe('ModalFornecedorComponent', () => {
  let component: ModalFornecedorComponent;
  let fixture: ComponentFixture<ModalFornecedorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalFornecedorComponent]
    });
    fixture = TestBed.createComponent(ModalFornecedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
