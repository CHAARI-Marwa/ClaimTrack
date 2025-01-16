import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionFormComponent } from './intervention-form.component';

describe('InterventionFormComponent', () => {
  let component: InterventionFormComponent;
  let fixture: ComponentFixture<InterventionFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InterventionFormComponent]
    });
    fixture = TestBed.createComponent(InterventionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
