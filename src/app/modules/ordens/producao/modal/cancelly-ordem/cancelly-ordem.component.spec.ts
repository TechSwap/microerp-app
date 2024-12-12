import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancellyOrdemComponent } from './cancelly-ordem.component';

describe('CancellyOrdemComponent', () => {
  let component: CancellyOrdemComponent;
  let fixture: ComponentFixture<CancellyOrdemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CancellyOrdemComponent]
    });
    fixture = TestBed.createComponent(CancellyOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
