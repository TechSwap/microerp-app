import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridServicosComponent } from './grid-servicos.component';

describe('GridServicosComponent', () => {
  let component: GridServicosComponent;
  let fixture: ComponentFixture<GridServicosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridServicosComponent]
    });
    fixture = TestBed.createComponent(GridServicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
