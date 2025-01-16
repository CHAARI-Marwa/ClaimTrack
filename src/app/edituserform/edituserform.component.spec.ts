import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdituserformComponent } from './edituserform.component';

describe('EdituserformComponent', () => {
  let component: EdituserformComponent;
  let fixture: ComponentFixture<EdituserformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdituserformComponent]
    });
    fixture = TestBed.createComponent(EdituserformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
