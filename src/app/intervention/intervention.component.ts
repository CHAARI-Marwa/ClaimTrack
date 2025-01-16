import { Component, OnInit } from '@angular/core';
import { InterventionService } from 'src/services/intervention.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'; // Importer Swal

import { PieceRechangeService } from 'src/services/PieceRechange.service';


@Component({
  selector: 'app-intervention',
  templateUrl: './intervention.component.html',
  styleUrls: ['./intervention.component.css']
})
export class InterventionComponent implements OnInit {

  interventions: any[] = [];

  constructor(
    private InterventionService: InterventionService,
    private pieceRechangeService: PieceRechangeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getInterventions();
    this.pieceRechangeService.refreshList(); // To get all pieces de rechange
  }

  // Fetch list of interventions
  getInterventions(): void {
    this.InterventionService.getInterventions().subscribe(
      (data) => {
        this.interventions = data;
      },
      (error) => {
        console.error('Error fetching interventions', error);
      }
    );
  }

  // Edit an intervention
  onEdit(id: number): void {
    this.router.navigate(['/edit-intervention', id]);
  }

  // Delete an intervention
  onDelete(id: number): void {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Cette action est irréversible!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.InterventionService.deleteIntervention(id).subscribe(
          () => {
            this.getInterventions(); // Refresh list after deletion
            Swal.fire('Supprimé!', 'L\'intervention a été supprimée.', 'success');
          },
          (error) => {
            console.error('Error deleting intervention', error);
            Swal.fire('Erreur', 'Une erreur est survenue lors de la suppression.', 'error');
          }
        );
      }
    });
  }

  // Navigate to form intervention to start a new intervention
  onPassToIntervention(intervention: any): void {
    this.router.navigate(['/form-intervention', intervention.id]);
  }
}
