import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BookCreationModel } from '../models/book-creation.model';
import { BookModel } from '../models/book.model';
import { BookService } from '../services/book.service';

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
  
  //imageSource: any;
  //imageSrc;
  //imageFile: any;
  
  //base64s
  imageString!: string;

  constructor(private bookService: BookService) {
    this.loadBooks();
   }

  loadBooks(){
    this.bookService.getBooks().subscribe({
      next: (books: any) => {
        this.bookmodels = books;
      }
    });
    // this.bookmodels.forEach(element => {
    //   element.coverImg = this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${element.cover}`);
    // });
  }
  
  saveBook(){
    this.bookService.saveBook(new BookCreationModel(this.book.id, this.book.title, this.book.author, this.imageString, this.book.content, this.book.genre))
            .subscribe({
              next: (res: any) => { 
                if(res.isSuccess) this.loadBooks();
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