import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  registerUser( u : User ):Observable<void>{
    return this.http.post<void>('https://localhost:7022/api/User/signup', u);
  }

  loginUser(email: string, password: string): Observable<any> {
    const loginRequest = { email, password };
    return this.http.post<any>('https://localhost:7022/api/User/login', loginRequest);
  }

}
