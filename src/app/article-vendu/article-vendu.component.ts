import { Component, OnInit } from '@angular/core';
import { ArticleDto } from 'src/models/articleDto';
import { ArticleVenduService } from 'src/services/articlevendu.service'; 
import { Router } from '@angular/router';


@Component({
  selector: 'app-article-vendu',
  templateUrl: './article-vendu.component.html',
  styleUrls: ['./article-vendu.component.css']
})
export class ArticleVenduComponent {
  articles: ArticleDto[] = [];

  constructor(
    private articleVenduService: ArticleVenduService,
    private router: Router
  ) {
    this.loadArticles();
  }

  // Méthode pour charger les articles
  loadArticles(): void {
    this.articleVenduService.getArticles().subscribe((data: ArticleDto[]) => {
      this.articles = data;
    });
  }

  // Méthode pour afficher les détails de l'article
  viewArticle(articleId: number): void {
    // Vous pouvez ici naviguer vers une page de détails ou afficher une modal.
    console.log('Affichage des détails de l\'article avec ID:', articleId);
    this.router.navigate(['/article-details', articleId]); 
  }
  
  
}