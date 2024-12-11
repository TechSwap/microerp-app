import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemServicoComponent } from './ordem-servico.component';

describe('OrdemServicoComponent', () => {
  let component: OrdemServicoComponent;
  let fixture: ComponentFixture<OrdemServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdemServicoComponent]
    });
    fixture = TestBed.createComponent(OrdemServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
