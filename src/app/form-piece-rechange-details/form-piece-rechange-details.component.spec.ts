import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPieceRechangeDetailsComponent } from './form-piece-rechange-details.component';

describe('FormPieceRechangeDetailsComponent', () => {
  let component: FormPieceRechangeDetailsComponent;
  let fixture: ComponentFixture<FormPieceRechangeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormPieceRechangeDetailsComponent]
    });
    fixture = TestBed.createComponent(FormPieceRechangeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
