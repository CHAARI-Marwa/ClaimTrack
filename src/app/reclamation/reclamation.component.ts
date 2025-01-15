import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReclamationDTO } from 'src/models/reclamation';
import { ReclamationService } from 'src/services/reclamation.service';

@Component({
  selector: 'app-reclamation',
  templateUrl: './reclamation.component.html',
  styleUrls: ['./reclamation.component.css']
})
export class ReclamationComponent implements OnInit{
  constructor(private rs: ReclamationService,private router: Router){}
  reclamations: ReclamationDTO[] = [];
  isLoading = true;
  errorMessage = '';
  
  ngOnInit(): void {
        this.loadReclamations();
        
  }
 
    
  loadReclamations(): void {
    this.rs.getAllReclamations().subscribe(
      (data) => {
        this.reclamations = data;
        console.log(this.reclamations)
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Erreur lors du chargement des réclamations.';
        this.isLoading = false;
        console.error(error);
      }
    );
  }
}
