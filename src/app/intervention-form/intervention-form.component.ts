import { Component, OnInit } from '@angular/core';
import { InterventionService } from 'src/services/intervention.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PieceRechangeService } from 'src/services/PieceRechange.service';
import { Intervention } from 'src/models/intervention';

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrls: ['./intervention-form.component.css']
})
export class InterventionFormComponent implements OnInit {
  formData: any = {
    idReclamation: '',
    duree: '',
    technicien: '',
    pieceRechange: '',
    dateIntervention: ''
  };
  pieces: any[] = [];
  todayDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pieceRechangeService: PieceRechangeService,
    private interventionService: InterventionService
  ) {}

  ngOnInit(): void {
    const idReclamation = this.route.snapshot.paramMap.get('reclamationId');
    if (idReclamation) {
      this.formData.idReclamation = idReclamation;
    }

    this.formData.dateIntervention = this.todayDate;
    this.loadPieces();
  }

  loadPieces(): void {
    this.pieceRechangeService.refreshList();
    setTimeout(() => {
      this.pieces = this.pieceRechangeService.list;
      if (this.pieces.length === 0) {
        console.warn('Aucune pièce de rechange chargée.');
      }
    }, 500);
  }

  onCancel(): void {
    this.router.navigate(['/dashboardadmin/reclamations']);
  }

  // This method will be triggered on form submission
  onSubmit(): void {
    if (this.formData.idReclamation && this.formData.duree && this.formData.technicien && this.formData.pieceRechange) {
      const newIntervention: Intervention = {
        id: 0, 
        reclamationId: this.formData.idReclamation,
        technicien: this.formData.technicien,
        duree: this.formData.duree,
        pieceRechangeId: this.formData.pieceRechange,
        dateIntervention: this.formData.dateIntervention
      };
  
      // Create the intervention first
      this.interventionService.createIntervention(newIntervention).subscribe({
        next: () => {
          console.log('Intervention enregistrée avec succès:');
  
          // After intervention is created, update the quantity of the selected spare part
          this.pieceRechangeService.updatePieceQuantity(this.formData.pieceRechange).subscribe({
            next: () => {
              console.log('Quantité de la pièce de rechange mise à jour.');
            },
            error: (err) => {
              console.error('Erreur lors de la mise à jour de la quantité de la pièce de rechange:', err);
            }
          });
  
          // Redirect after successful save
          this.router.navigate(['/dashboardadmin/reclamations']);
        },
        error: (err) => {
          console.error('Erreur lors de l\'enregistrement de l\'intervention:', err);
        }
      });
    } else {
      console.error('Veuillez remplir tous les champs requis.');
    }
  }
}
