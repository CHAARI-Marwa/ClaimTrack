import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleVenduComponent } from './article-vendu.component';

describe('ArticleVenduComponent', () => {
  let component: ArticleVenduComponent;
  let fixture: ComponentFixture<ArticleVenduComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArticleVenduComponent]
    });
    fixture = TestBed.createComponent(ArticleVenduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
