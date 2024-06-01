import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDepartamentosComponent } from './modal-departamentos.component';

describe('ModalDepartamentosComponent', () => {
  let component: ModalDepartamentosComponent;
  let fixture: ComponentFixture<ModalDepartamentosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDepartamentosComponent]
    });
    fixture = TestBed.createComponent(ModalDepartamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
