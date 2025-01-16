import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDto } from 'src/models/articleDto';
import { ReclamationDTO } from 'src/models/reclamation';
import { ArticleVenduService } from 'src/services/articlevendu.service';
import { ReclamationService } from 'src/services/reclamation.service';

@Component({
  selector: 'app-homeclient',
  templateUrl: './homeclient.component.html',
  styleUrls: ['./homeclient.component.css']
})
export class HomeclientComponent implements OnInit{
  constructor(private route: ActivatedRoute,private rs: ReclamationService, private articleVenduService: ArticleVenduService,private router: Router){}
  userId: number=0;
  reclamations: ReclamationDTO[] = [];
  articles: ArticleDto[] = [];
  isLoading = true;
  errorMessage = '';
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.loadReclamationsByUserId(+userId);
        this.loadArticles(+userId);
      }
      console.log('User ID:', userId);
    });
  }
  loadReclamationsByUserId(userId: number): void {
    this.rs.getReclamationsByUserId(userId).subscribe(
      (data) => {
        this.reclamations = data;
        console.log(this.reclamations)
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = `Erreur lors du chargement des réclamations pour l'utilisateur ${userId}.`;
        this.isLoading = false;
        console.error(error);
      }
    );
  }
  
    loadArticles(userId: number): void {
      this.articleVenduService.getArticlesByUserId(userId).subscribe((data: ArticleDto[]) => {
        this.articles = data;
      });
    }
  
    goToArticleDetail(userId: number, articleId: number): void {
      this.router.navigate([`/reclamation/${userId}/${articleId}`]);
    }

    logout(): void {
      this.router.navigate(['/login']);
    }
    
    deleteReclamation(articleId: number) {
      this.rs.deleteReclamationByArticleId(articleId).subscribe({
        next: () => {
          alert('Réclamation supprimée avec succès');
          this.loadReclamationsByUserId(this.userId);
        },
        error: (err) => {
          if (err.status === 404) {
            alert(`Aucune réclamation trouvée pour l'article avec l'ID ${articleId}`);
          } else {
            alert('Erreur lors de la suppression de la réclamation');
          }
        }
      });
    }
}
