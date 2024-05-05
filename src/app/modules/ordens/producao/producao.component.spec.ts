import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoComponent } from './producao.component';

describe('ProducaoComponent', () => {
  let component: ProducaoComponent;
  let fixture: ComponentFixture<ProducaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducaoComponent]
    });
    fixture = TestBed.createComponent(ProducaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
