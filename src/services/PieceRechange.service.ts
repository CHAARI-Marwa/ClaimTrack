import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NgForm } from "@angular/forms";
import { PieceRechangeDetails } from 'src/models/PieceRechangeDetails';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PieceRechangeService {
  
  url = 'https://localhost:7022/api/PieceDetail'
  list: PieceRechangeDetails[] = [];
  formData: PieceRechangeDetails = new PieceRechangeDetails()
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { 
 
  }

  refreshList() {
    this.http.get(this.url).subscribe({
      next: (res) => {
        console.log('Données reçues depuis l\'API:', res);
        this.list = this.transformToPascalCase(res as any[]);
        if (this.list.length === 0) {
          console.warn('Aucune donnée retournée par l\'API.');
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des pièces de rechange :', err);
      }
    });
  }
  
  
  transformToPascalCase(data: any[]): PieceRechangeDetails[] {
    return data.map(item => ({
      PieceId: item.pieceId,
      IntitulePiece: item.intitulePiece,
      Quantite: item.quantite
    }));
  }
  
  

  postPieceRechangeDetails() {
    return this.http.post(this.url, this.formData)
  }

  putPieceRechangeDetails() {
    return this.http.put(this.url + '/' + this.formData.PieceId, this.formData)
  }


  deletePieceRechangeDetails(id: number) {
    return this.http.delete(this.url + '/' + id)
  }


  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new PieceRechangeDetails()
    this.formSubmitted = false
  }

  updatePieceQuantity(pieceId: number): Observable<any> {
    // Decrement the quantity of the selected piece by 1
    return this.http.put<any>(`${this.url}/updatePieceQuantity/${pieceId}`, {});
  }
}