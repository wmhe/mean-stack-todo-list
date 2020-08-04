import {Component} from '@angular/core';
import {ListService} from '../services/list.service';

@Component({
    selector: 'landing-page',
    templateUrl: 'landing-page.component.html',
    styleUrls: ['landing-page.component.css'],
})
export class LandingPageComponent {

    todoKeys: string[];
    completedKeys: string[];

    constructor(private listService: ListService) {
        this.todoKeys = this.listService.getKeys();
    }

    onAdd(todo: string) {
        if (todo.length > 0)
        {
            this.listService.addTodo(todo.trim());
            this.todoKeys = this.listService.getKeys();
            todo = "";
        }
    }

    onDelete(todo: string) {
        this.listService.deleteTodo(todo);
        this.todoKeys = this.listService.getKeys();
    }

    onCheck(todo: string) {
        this.listService.completeTodo(todo);
        this.todoKeys = this.listService.getKeys();
        this.completedKeys = this.listService.getCompletedKeys();
    }
}