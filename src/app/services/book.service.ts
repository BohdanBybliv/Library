import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BookCreationModel } from "../models/book-creation.model";
import { RatingCreationModel } from "../models/rating-creation.model";
import { ReviewCreationModel } from "../models/review-creation.model";

@Injectable()
export class BookService{
    constructor(private http: HttpClient) {
    }
    
    saveBook(book: BookCreationModel){
        return this.http.post('api/books/save', book);
    }

    addReview(review: ReviewCreationModel){
        return this.http.post('api/books/review', review);
    }

    addRating(rating: RatingCreationModel){
        return this.http.post('api/books/rating', rating);
    }

    getAllBooks() {
        return this.http.get('api/books');
    }

    getRecommendedBooks(){
        return this.http.get('api/recommended');
    }

    getBookById(id: number) {
        return this.http.get('api/books/' + id);
    }
}