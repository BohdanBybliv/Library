import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookCreationModel } from '../models/book-creation.model';
import { BookModel } from '../models/book.model';
import { BookService } from '../services/book.service';
import { MatDialog } from '@angular/material/dialog';
import { BookDetailsComponent } from '../book-details/book-details.component';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css'],
  providers: [BookService]
})
export class BookFormComponent {
  book: BookCreationModel = new BookCreationModel(0, "", "", "", "", "");
  books: BookCreationModel[] = [];
  bookmodels: BookModel[] = [];

  formLabel: string = "Add Book";
  //imageSource: any;
  //imageSrc;
  //imageFile: any;
  
  //base64s
  imageString: string = "";

  constructor(private bookService: BookService,
    public dialog: MatDialog) {
    this.loadAllBooks();
   }

  loadAllBooks(){
    this.bookService.getAllBooks().subscribe({
      next: (res: any) => {
        this.bookmodels = res;
      }
    });
  }

  loadRecommendedBooks(){
    this.bookService.getRecommendedBooks().subscribe({
      next: (res: any) => {
        this.bookmodels = res;
      }
    })
  }
  
  saveBook(){
    this.bookService.saveBook(new BookCreationModel(this.book.id, this.book.title, this.book.author, this.imageString == "" ? this.book.cover : this.imageString, this.book.content, this.book.genre))
            .subscribe({
              next: (res: any) => { 
                this.loadAllBooks();
                this.clear();
              }
            })
  }

  clear(){
    this.formLabel = "Add Book";
    this.book = new BookCreationModel(0, "", "", "", "", "");
  }

  details(bookId: number){

    this.dialog.open(BookDetailsComponent, {
      width: '700px',
      height: '660px',
      data: {
        bookId: bookId
      }
    })
  }

  edit(bookId: number){
    this.formLabel = "Edit Book";
    this.bookService.getBookById(bookId).subscribe({
      next: (res: any) => {
        this.book = res;
      }
    })
  }

  public picked(event: any) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      //this.imageFile = file;
      this.handleInputChange(file); //turn into base64
    }
  }

  handleInputChange(files: File) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e: { target: any; }) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.imageString = base64result;
  }
}