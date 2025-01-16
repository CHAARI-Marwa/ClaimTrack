import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/models/articleDto';
import { ArticleVenduService } from 'src/services/articlevendu.service';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.css']
})
export class ArticleformComponent implements OnInit {
  article: ArticleDto = {
    id: 0,
    nomArticle: '',
    idUser: 0,
    dateAchat: '',
    dureeGarantie: 0,
  };

  constructor( private articleService: ArticleVenduService,private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Récupérer l'ID utilisateur depuis l'URL si nécessaire
    const idUser = this.route.snapshot.paramMap.get('id');
    if (idUser) {
      this.article.idUser = +idUser; // Convertir l'ID utilisateur en nombre
    }
  }

  submitArticle(): void {
    this.articleService.addArticle(this.article).subscribe({
      next: (response) => {
        console.log('Article ajouté avec succès', response);
        this.router.navigate(['dashboardadmin/articles']); // Rediriger après l'ajout
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout de l’article', error);
      },
    });
  }
}
