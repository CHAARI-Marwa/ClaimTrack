import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationDTO } from 'src/models/reclamation';
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

  constructor(private reclamationService: ReclamationService,private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = +params['userId'];
      const articleId = +params['articleId'];
      this.reclamation.idUser = userId;
      this.reclamation.idArticle = articleId;
    });
  }

  submitReclamation(): void {
    this.reclamationService.addReclamation(this.reclamation).subscribe(
      (response) => {
        console.log('Reclamation ajoutée avec succès', response);
        this.router.navigate([`/dashboardclient/${this.reclamation.idUser}`]);
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de la réclamation', error);
      }
    );
  }
}