import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookCreationModel } from "../models/book-creation.model";

@Injectable()
export class BookService{
    constructor(private http: HttpClient) {
    }
    
    saveBook(book: BookCreationModel){
        return this.http.post('api/books/save', book);
    }

    getBooks() {
        return this.http.get('api/books');
    }
}