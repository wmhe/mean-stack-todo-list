import {Component, OnInit} from '@angular/core';
import {ListService} from '../services/list.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['landing-page.component.css'],
})
export class LandingPageComponent {

    todoKeys: string[];
    saveSuccess: boolean;

    constructor(private listService: ListService, 
        private authService: AuthService, private router: Router) {
            this.listService.keysFromDatabase(localStorage.getItem("email"))
            .subscribe(
              res => {
                this.todoKeys = [...res.user.todos];
                this.listService.setKeys(this.todoKeys);
              },
              error => {
                console.log(error);
              },
            );
        this.saveSuccess = false;
    }

    onAdd(todo: string) {
        if (todo.length > 0) {
            this.listService.addTodo(todo.trim());
            this.todoKeys = this.listService.getKeys();
        }
    }

    onDelete(todo: string) {
        this.listService.deleteTodo(todo);
        this.todoKeys = this.listService.getKeys();
    }

    checkLoggedIn() {
        return this.authService.isLoggedIn();
    }

    onLogOut() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    onSave() {
        this.listService.saveList(localStorage.getItem('email'))
        .subscribe(
            res => {
                console.log(res);
                this.saveSuccess = true;
            },
            error => {
                console.log(error);
                this.saveSuccess = false;
            }
        )
    }
}