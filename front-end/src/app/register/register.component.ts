import {Component} from '@angular/core';
import {RegisterService} from '../services/register.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
})
export class RegisterComponent {
    registerForm: FormGroup;
    newUser = {};
    isError: boolean;

    constructor(private registerService: RegisterService, private authService: AuthService, 
        private fb: FormBuilder, private router: Router) {
        this.registerForm = this.fb.group({
            email: [''],
            password: ['']
        });
        this.isError = false;
    }

    getEmail(): string {
        return this.registerForm.value.email;
    }

    getPassword(): string {
        return this.registerForm.value.password;
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.authService.registerUser({email: this.getEmail(), password: this.getPassword()})
            .subscribe(
                res => {
                    this.isError = false;
                    localStorage.setItem('token', res.token);
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