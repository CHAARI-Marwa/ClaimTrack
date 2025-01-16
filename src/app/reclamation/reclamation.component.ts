import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationDTO } from 'src/models/reclamation';
import { ReclamationService } from 'src/services/reclamation.service';
import { InterventionService } from 'src/services/intervention.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit {
  reclamations: ReclamationDTO[] = [];
  isLoading = true;
  errorMessage = '';
  
  constructor(
    private rs: ReclamationService,
    private interventionService: InterventionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReclamations();
  }

  loadReclamations(): void {
    this.rs.getAllReclamations().subscribe(
      (reclamations) => {
        this.interventionService.getInterventions().subscribe(
          (interventions) => {
            const interventionReclamationIds = interventions.map(i => i.reclamationId);
            this.reclamations = reclamations.filter(
              (reclamation) => !interventionReclamationIds.includes(reclamation.idArticle)
            );
            console.log(this.reclamations);
            this.isLoading = false;
          },
          (error) => {
            this.errorMessage = 'Erreur lors du chargement des interventions.';
            this.isLoading = false;
            console.error(error);
          }
        );
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des réclamations.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }

  passerIntervention(reclamationId: number): void {
    this.router.navigate(['/intervention-form', reclamationId]);
  }
}