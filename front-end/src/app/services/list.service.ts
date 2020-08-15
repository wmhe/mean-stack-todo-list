import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class ListService {

    private saveUrl = "http://localhost:3000/api/save-todos";
    private getUrl = "http://localhost:3000/api/get-todos";

    todoSet;

    constructor(private httpClient: HttpClient) {}

    getKeys(): string[] {
        return Array.from(this.todoSet);
    }

    setKeys(todos: string[]) {
        this.todoSet = new Set(todos);
    }

    keysFromDatabase(email: string) {
        return this.httpClient.post<any>(this.getUrl, {email: email});
    }

    addTodo(key: string) {
        this.todoSet.add(key);
    }

    deleteTodo(key: string) {
        this.todoSet.delete(key);
    }

    saveList(email: string) {
        let saveObject = {
            email: email,
            todos: Array.from(this.todoSet),
        };
        return this.httpClient.post<any>(this.saveUrl, saveObject);
    }
}