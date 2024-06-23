import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComprasComponent } from './modal-compras.component';

describe('ModalComprasComponent', () => {
  let component: ModalComprasComponent;
  let fixture: ComponentFixture<ModalComprasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalComprasComponent]
    });
    fixture = TestBed.createComponent(ModalComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
