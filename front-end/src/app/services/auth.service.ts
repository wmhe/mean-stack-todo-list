import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private loginUrl = "http://localhost:3000/api/login";
    private registerUrl = "http://localhost:3000/api/register";

    constructor(private httpClient: HttpClient) {}

    loginUser(user) {
        return this.httpClient.post<any>(this.loginUrl, user);
    }

    registerUser(user) {
        return this.httpClient.post<any>(this.registerUrl, user);
    }

    isLoggedIn() {
        return !!localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    }
}