import { Component, OnInit } from '@angular/core';
import { PieceRechangeService } from 'src/services/PieceRechange.service';
import { ToastrService } from 'ngx-toastr';
import { PieceRechangeDetails } from 'src/models/PieceRechangeDetails';

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
    if (confirm('Are you sure to delete this record?')) {
      this.PieceRechangeService.deletePieceRechangeDetails(id)
        .subscribe({
          next: res => {
            this.PieceRechangeService.refreshList(); 
            this.toastr.error('Deleted successfully', 'Piece Rechange Details');
          },
          error: err => { console.log(err); }
        });
    }
  }

}
