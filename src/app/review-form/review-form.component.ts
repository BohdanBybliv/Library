import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RatingCreationModel } from '../models/rating-creation.model';
import { ReviewCreationModel } from '../models/review-creation.model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css'],
  providers: [BookService]
})
export class ReviewFormComponent {
  review: ReviewCreationModel = new ReviewCreationModel(0, "", "", 0);
  rating: RatingCreationModel = new RatingCreationModel(0, 1, 0);
  

  constructor(public dialogRef: MatDialogRef<ReviewFormComponent>,
    private bookService: BookService,
    @Inject(MAT_DIALOG_DATA) public data: any)
  {
      this.review.bookId = data.bookId;
      this.rating.bookId = data.bookId;
  }

  save(){
    this.bookService.addReview(this.review).subscribe({
      next:(res: any) => {
        
      }
    })
    this.bookService.addRating(this.rating).subscribe({
      next:(res: any) => {
        
      }
    })
    this.dialogRef.close();
  }
}
