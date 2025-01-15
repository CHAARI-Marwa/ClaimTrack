import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReclamationDTO } from 'src/models/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private apiUrl = 'https://localhost:7022/api/Reclamation'; // URL de votre API backend

  constructor(private http: HttpClient) {}

  getAllReclamations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getReclamationsByUserId(userId: number): Observable<any[]> {
    const url = `${this.apiUrl}/ByUser/${userId}`;
    return this.http.get<any[]>(url);
  }

  addReclamation(reclamation: ReclamationDTO): Observable<ReclamationDTO> {
    return this.http.post<ReclamationDTO>(this.apiUrl, reclamation);
  }
  
}
