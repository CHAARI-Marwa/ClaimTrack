import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/models/articleDto';
import { ArticleVenduService } from 'src/services/articlevendu.service';

@Component({
  selector: 'app-editarticleform',
  templateUrl: './editarticleform.component.html',
  styleUrls: ['./editarticleform.component.css']
})
export class EditarticleformComponent implements OnInit {
  article: ArticleDto = {
    id: 0,
    nomArticle: '',
    idUser: 0,
    dateAchat: '',
    dureeGarantie: 0,
  };

  constructor(
    private articleService: ArticleVenduService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));  // Récupère l'ID de l'article
    if (id) {
      this.getArticleById(id);  // Charge l'article à modifier
    }
  }

  getArticleById(id: number): void {
    this.articleService.getArticleById(id).subscribe(
      (data) => {
        this.article = data;
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'article', error);
      }
    );
  }

  onSubmit(): void {
    this.articleService.updateArticle(this.article.id, this.article).subscribe(
      (updatedArticle) => {
        console.log('Article mis à jour avec succès', updatedArticle);
        this.router.navigate(['/dashboardadmin/articles']);  // Redirige vers la liste des articles
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de l\'article', error);
      }
    );
  }
}