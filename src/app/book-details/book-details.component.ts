import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookDetailsModel } from '../models/book-details.model';
import { ReviewModel } from '../models/review.model';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [BookService]
})
export class BookDetailsComponent {
  bookmodel: BookDetailsModel = new BookDetailsModel(0, "", "", "", "", "", 0, [new ReviewModel(0, "", "")]);
  
  constructor(private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.loadBookDetails(data.bookId);
  }

  loadBookDetails(bookId: number){
    this.bookService.getBookById(bookId).subscribe({
      next: (res: any) => {
        this.bookmodel = res;
      }
    })
  }
}
