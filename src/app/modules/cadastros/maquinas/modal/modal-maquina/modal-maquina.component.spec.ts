import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaquinaComponent } from './modal-maquina.component';

describe('ModalMaquinaComponent', () => {
  let component: ModalMaquinaComponent;
  let fixture: ComponentFixture<ModalMaquinaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMaquinaComponent]
    });
    fixture = TestBed.createComponent(ModalMaquinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
