import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOrdemComponent } from './start-ordem.component';

describe('StartOrdemComponent', () => {
  let component: StartOrdemComponent;
  let fixture: ComponentFixture<StartOrdemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartOrdemComponent]
    });
    fixture = TestBed.createComponent(StartOrdemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
