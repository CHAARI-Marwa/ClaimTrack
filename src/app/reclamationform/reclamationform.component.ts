import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/models/articleDto';
import { ReclamationDTO } from 'src/models/reclamation';
import { ArticleVenduService } from 'src/services/articlevendu.service';
import { ReclamationService } from 'src/services/reclamation.service';

@Component({
  selector: 'app-reclamationform',
  templateUrl: './reclamationform.component.html',
  styleUrls: ['./reclamationform.component.css']
})
export class ReclamationformComponent implements OnInit {
  reclamation: ReclamationDTO = {
    sujet: '',
    description: '',
    dateReclamation: new Date(),
    idUser: 0,
    idArticle: 0,
    statut: 'En attente' 
  };

  constructor(private reclamationService: ReclamationService,private route: ActivatedRoute, private router: Router,private articleService: ArticleVenduService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      const articleId = +params['articleId'];
      this.reclamation.idUser = userId;
      this.reclamation.idArticle = articleId;
    });
  }

  submitReclamation(): void {
    this.articleService.getArticleById(this.reclamation.idArticle).subscribe(
      (article: ArticleDto) => {
        const dateReclamation = new Date(this.reclamation.dateReclamation);
        const dateAchat = new Date(article.dateAchat);
        
        const diffInTime = dateReclamation.getTime() - dateAchat.getTime();
        const diffInMonths = diffInTime / (1000 * 3600 * 24 * 30);
  
        if (diffInMonths <= article.dureeGarantie) {
          this.reclamation.statut = 'Encore sous garantie : intervention gratuite';
        } else {
          this.reclamation.statut = 'Plus sous garantie : intervention payante';
        }
  
        this.reclamationService.addReclamation(this.reclamation).subscribe(
          (response) => {
            console.log('Réclamation ajoutée avec succès', response);
            this.router.navigate([`/dashboardclient/${this.reclamation.idUser}`]);
          },
          (error: any) => {
            console.error('Erreur lors de l\'ajout de la réclamation', error);
          }
        );
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'article', error);
      }
    );
  }
  
}