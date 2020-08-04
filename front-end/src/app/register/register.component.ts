import {Component} from '@angular/core';
import {RegisterService} from '../services/register.service';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
    selector: 'register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css'],
})
export class RegisterComponent {
    registerForm: FormGroup
    newUser = {}

    constructor(private registerService: RegisterService, private fb: FormBuilder) {
        this.registerForm = this.fb.group({
            email: [''],
            password: ['']
        })
    }

    getEmail(): string {
        return this.registerForm.value.email;
    }

    getPassword(): string {
        return this.registerForm.value.password;
    }

    onSubmit() {
        if (this.registerForm.valid) {
            this.registerService.registerUser({email: this.getEmail(), password: this.getPassword()})
            .subscribe(
                res => console.log(res),
                err => console.log(err)
            )
        }
    }
}