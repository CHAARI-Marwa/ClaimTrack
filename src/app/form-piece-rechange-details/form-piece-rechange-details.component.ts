import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PieceRechangeDetails } from 'src/models/PieceRechangeDetails';
import { PieceRechangeService } from 'src/services/PieceRechange.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-form-piece-rechange-details',
  templateUrl: './form-piece-rechange-details.component.html',
  styleUrls: ['./form-piece-rechange-details.component.css']
})
export class FormPieceRechangeDetailsComponent implements OnInit{

  constructor(public PieceRechangeService: PieceRechangeService, private toastr: ToastrService) {
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(form: NgForm) {
    console.log('Form valid:', form.valid);
    console.log('Form value:', form.value);
    this.PieceRechangeService.formSubmitted = true;
    if (form.valid) {
      console.log('Form is valid, submitting...');
      if (this.PieceRechangeService.formData.PieceId == 0) {
        this.insertRecord(form);
        this.PieceRechangeService.refreshList();
      } else {
        this.updateRecord(form);
        this.PieceRechangeService.refreshList();
      }
    } else {
      console.log('Form is invalid.');
    }
  }

  insertRecord(form: NgForm) {
    this.PieceRechangeService.postPieceRechangeDetails()
      .subscribe({
        next: res => {
          this.PieceRechangeService.list = res as PieceRechangeDetails[];
          this.PieceRechangeService.resetForm(form);
          this.PieceRechangeService.refreshList();
          
          // Display SweetAlert for Insert
          Swal.fire({
            icon: 'success',
            title: 'Inserted successfully',
            text: 'Rechange Detail Register'
          });
        },
        error: err => { console.log(err); }
      });
  }

  updateRecord(form: NgForm) {
    this.PieceRechangeService.putPieceRechangeDetails()
      .subscribe({
        next: res => {
          this.PieceRechangeService.list = res as PieceRechangeDetails[];
          this.PieceRechangeService.resetForm(form);
          this.PieceRechangeService.refreshList();
          
          // Display SweetAlert for Update
          Swal.fire({
            icon: 'info',
            title: 'Updated successfully',
            text: 'Payment Detail Register'
          });
        },
        error: err => { console.log(err); }
      });
  }
}
