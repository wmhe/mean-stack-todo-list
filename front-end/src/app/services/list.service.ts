import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ListService {

    todoSet = new Set([
        "to-do 1",
        "to-do 2",
        "to-do 3",
    ]);

    todoCompletedSet = new Set([]);

    constructor() {}

    getKeys(): string[] {
        return Array.from(this.todoSet);
    }

    getCompletedKeys(): string[] {
        return Array.from(this.todoCompletedSet);
    }

    addTodo(key: string) {
        this.todoSet.add(key);
    }

    deleteTodo(key: string) {
        this.todoSet.delete(key);
    }

    completeTodo(key: string) {
        this.deleteTodo(key);
        this.todoCompletedSet.add(key);
    }
}