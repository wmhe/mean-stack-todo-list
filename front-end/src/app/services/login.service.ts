import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  private loginUrl = "http://localhost:3000/api/login";

  constructor(private http: HttpClient) { }

  loginUser(user) {
	  return this.http.post<any>(this.loginUrl, user);
  }
}
