import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto } from 'src/models/articleDto';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenduService {

  private apiUrl = 'https://localhost:44340/api/ArticleVendu';  // URL de base pour les requêtes API

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les articles
  getArticles(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(this.apiUrl);  // Appel GET pour récupérer tous les articles
  }

  // Méthode pour récupérer un article par son ID
  getArticleById(id: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/${id}`);  // Appel GET pour récupérer un article par son ID
  }

  // Méthode pour ajouter un nouvel article
  addArticle(article: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(this.apiUrl, article);  // Appel POST pour ajouter un nouvel article
  }

}
