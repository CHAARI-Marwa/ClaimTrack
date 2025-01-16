import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArticleDto } from 'src/models/articleDto';

@Injectable({
  providedIn: 'root'
})
export class ArticleVenduService {

  private apiUrl = 'https://localhost:7022/api/ArticleVendu';

  constructor(private http: HttpClient) { }

  // Méthode pour récupérer tous les articles
  getArticles(): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(this.apiUrl);
  }

  // Méthode pour récupérer un article par son ID
  getArticleById(id: number): Observable<ArticleDto> {
    return this.http.get<ArticleDto>(`${this.apiUrl}/${id}`);
  }

  // Méthode pour ajouter un nouvel article
  addArticle(article: ArticleDto): Observable<ArticleDto> {
    return this.http.post<ArticleDto>(this.apiUrl, article);  // Appel POST pour ajouter un nouvel article
  }

  getArticlesByUserId(userId: number): Observable<ArticleDto[]> {
    return this.http.get<ArticleDto[]>(`${this.apiUrl}/user/${userId}`);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateArticle(id: number, article: ArticleDto): Observable<ArticleDto> {
    return this.http.put<ArticleDto>(`${this.apiUrl}/${id}`, article);
  }

}
