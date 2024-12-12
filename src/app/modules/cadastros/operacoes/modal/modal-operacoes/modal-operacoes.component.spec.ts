import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOperacoesComponent } from './modal-operacoes.component';

describe('ModalOperacoesComponent', () => {
  let component: ModalOperacoesComponent;
  let fixture: ComponentFixture<ModalOperacoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalOperacoesComponent]
    });
    fixture = TestBed.createComponent(ModalOperacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
