import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinallyOrdemComponent } from './finally-ordem.component';

describe('FinallyOrdemComponent', () => {
  let component: FinallyOrdemComponent;
  let fixture: ComponentFixture<FinallyOrdemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinallyOrdemComponent]
    });
    fixture = TestBed.createComponent(FinallyOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
