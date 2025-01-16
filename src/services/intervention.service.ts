import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intervention } from 'src/models/intervention';


@Injectable({
  providedIn: 'root'
})

export class InterventionService {
  private apiUrl = 'https://localhost:7022/api/Interventions'

  constructor(private http: HttpClient) {}

  getInterventions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getInterventionById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createIntervention(intervention: Intervention): Observable<any> {
    return this.http.post<any>(this.apiUrl, intervention);
  }

  updateIntervention(intervention: Intervention): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${intervention.id}`, intervention);
  }

  deleteIntervention(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  
}
