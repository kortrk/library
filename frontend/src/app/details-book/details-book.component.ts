import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';

@Component({
  selector: 'details-book',
  standalone: true,
  imports: [],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {
  bookDbService: BookDbService;
  book: Book;
  defaultBook: Book;

  constructor(){
    this.bookDbService = inject(BookDbService);
    this.defaultBook = new Book({
      title: 'string',
      author: 'string',
      publisher: 'string',
      publication_date: 'string',
      id: 0,
      image: 'string',
      currentBorrower: null
    });
    this.book = this.defaultBook;
  }

  @Input()
  set id(providedId: number) {
    console.log(`id is being set: ${providedId}`)
    var showBook = this.bookDbService.getBook(providedId);
    console.log(`found this book for ${providedId}`)
    console.log(showBook)
    if (showBook){
      this.book = showBook;
    } else {
      this.book = this.defaultBook;
    }
  }
}
