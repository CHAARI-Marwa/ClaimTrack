import { Component, OnInit } from '@angular/core';
import { PieceRechangeService } from 'src/services/PieceRechange.service';
import { ToastrService } from 'ngx-toastr';
import { PieceRechangeDetails } from 'src/models/PieceRechangeDetails';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-piece-rechange-details',
  templateUrl: './piece-rechange-details.component.html',
  styleUrls: ['./piece-rechange-details.component.css']
})
export class PieceRechangeDetailsComponent implements OnInit {

  constructor(public PieceRechangeService: PieceRechangeService , private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.PieceRechangeService.refreshList();
  }

  populateForm(selectedRecord: PieceRechangeDetails) {
    this.PieceRechangeService.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: "Vous ne pourrez pas annuler cette action !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.PieceRechangeService.deletePieceRechangeDetails(id)
          .subscribe({
            next: res => {
              this.PieceRechangeService.refreshList();
              Swal.fire(
                'Supprimé!',
                'L\'élément a été supprimé avec succès.',
                'success'
              );
            },
            error: err => { 
              console.log(err); 
              Swal.fire(
                'Erreur',
                'Une erreur est survenue lors de la suppression.',
                'error'
              );
            }
          });
      }
    });
  }
  

}
