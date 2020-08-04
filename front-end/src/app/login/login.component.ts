import {Component} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import { LoginService } from '../services/login.service';
import {User} from '../user';

 @Component({
     selector: 'login',
     templateUrl: 'login.component.html',
     styleUrls: ['login.component.css'],
 })
 export class LoginComponent {
    loginForm: FormGroup
    user: User

    constructor(private fb: FormBuilder, private loginService: LoginService) {
        this.loginForm = this.fb.group({
            email: [''],
            password: [''],
        });
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
            this.loginService.loginUser(this.user)
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            )
            
        }
    }
 }