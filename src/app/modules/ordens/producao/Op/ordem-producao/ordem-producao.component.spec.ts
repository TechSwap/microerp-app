import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdemProducaoComponent } from './ordem-producao.component';

describe('OrdemProducaoComponent', () => {
  let component: OrdemProducaoComponent;
  let fixture: ComponentFixture<OrdemProducaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdemProducaoComponent]
    });
    fixture = TestBed.createComponent(OrdemProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
