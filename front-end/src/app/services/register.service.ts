import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private registerUrl = "http://localhost:3000/api/register";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this.registerUrl, user);
  }
}
