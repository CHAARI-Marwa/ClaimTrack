import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceRechangeDetailsComponent } from './piece-rechange-details.component';

describe('PieceRechangeDetailsComponent', () => {
  let component: PieceRechangeDetailsComponent;
  let fixture: ComponentFixture<PieceRechangeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PieceRechangeDetailsComponent]
    });
    fixture = TestBed.createComponent(PieceRechangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
