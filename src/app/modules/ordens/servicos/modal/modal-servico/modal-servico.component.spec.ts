import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServicoComponent } from './modal-servico.component';

describe('ModalServicoComponent', () => {
  let component: ModalServicoComponent;
  let fixture: ComponentFixture<ModalServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalServicoComponent]
    });
    fixture = TestBed.createComponent(ModalServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
