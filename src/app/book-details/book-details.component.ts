import { Component } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { BookService } from '../services/book.service';
import { BookDetailsModel } from '../models/book-details.model';
import { ReviewModel } from '../models/review.model';
import { ReviewFormComponent } from '../review-form/review-form.component';
@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [BookService]
})
export class BookDetailsComponent {
  bookmodel: BookDetailsModel = new BookDetailsModel(0, "", "", "", "", "", 0, [new ReviewModel(0, "", "")]);
  bookId: number = 0;
  constructor(private bookService: BookService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
    this.bookId = data.bookId;
    this.loadBookDetails(this.bookId);
  }

  loadBookDetails(bookId: number){
    this.bookService.getBookById(bookId).subscribe({
      next: (res: any) => {
        this.bookmodel = res;
      }
    })
  }

  addReview(bookId: number){
    this.dialog.open(ReviewFormComponent, {
      width: '400px',
      height: '230px',
      data: {
        bookId: bookId
      }
    }).afterClosed().subscribe(()=>this.loadBookDetails(bookId));
  }
}
