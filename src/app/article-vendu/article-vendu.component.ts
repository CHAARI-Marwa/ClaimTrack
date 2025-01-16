import { Component, OnInit } from '@angular/core';
import { ArticleDto } from 'src/models/articleDto';
import { ArticleVenduService } from 'src/services/articlevendu.service'; 
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user';


@Component({
  selector: 'app-article-vendu',
  templateUrl: './article-vendu.component.html',
  styleUrls: ['./article-vendu.component.css']
})
export class ArticleVenduComponent {
  articles: ArticleDto[] = [];
  users: { [key: number]: User } = {};

  constructor(
    private userService: UserService,
    private articleVenduService: ArticleVenduService,
    private router: Router
  ) {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleVenduService.getArticles().subscribe((data: ArticleDto[]) => {
      this.articles = data;
    });
  }

  viewArticle(articleId: number): void {
    console.log('Affichage des détails de l\'article avec ID:', articleId);
    this.router.navigate(['/article-details', articleId]); 
  }

  getUserById(id: number): void {
    this.userService.getUserById(id).subscribe({
      next: (user) => {
        this.users[id] = user;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l’utilisateur :', err);
      },
    });
  }

  deleteArticle(id: number): void {
    this.articleVenduService.deleteArticle(id).subscribe(
      (response) => {
        console.log('Article supprimé avec succès', response);
        this.loadArticles();
      },
      (error) => {
        console.error('Erreur lors de la suppression de l\'article', error);
      }
    );
  }
  
  edit(id: number): void {
    this.router.navigate([`dashboardadmin/editarticle/${id}`]);
  }
 
}