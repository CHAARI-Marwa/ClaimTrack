import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarticleformComponent } from './editarticleform.component';

describe('EditarticleformComponent', () => {
  let component: EditarticleformComponent;
  let fixture: ComponentFixture<EditarticleformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarticleformComponent]
    });
    fixture = TestBed.createComponent(EditarticleformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
