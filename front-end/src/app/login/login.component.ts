import {Component} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {User} from '../user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

 @Component({
     selector: 'login',
     templateUrl: 'login.component.html',
     styleUrls: ['login.component.css'],
 })
 export class LoginComponent {
    loginForm: FormGroup
    user: User
    isError: boolean;

    constructor(private fb: FormBuilder, 
        private router: Router, private authService: AuthService) {
        this.loginForm = this.fb.group({
            email: [''],
            password: [''],
        });
        this.user = new User();
        this.isError = false;
    }

    getEmail(): string {
        return this.loginForm.value.email;
    }

    getPassword(): string {
        return this.loginForm.value.password;
    }

    onSubmit() {
        if (this.loginForm.valid) {
            this.user.email = this.getEmail();
            this.user.password = this.getPassword();
            this.authService.loginUser(this.user)
            .subscribe(
                res => {
                    this.isError = false;
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('email', res.user.email);
                    this.router.navigate(['/home']);
                },
                err => {
                    console.log(err);
                    this.isError = true;
                }
            )
        }
    }
 }