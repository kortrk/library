import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'details-book',
  standalone: true,
  imports: [RouterLink],
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
      duedate: 'string',
      currentBorrower: null
    });
    this.book = this.defaultBook;
  }

  @Input()
  set id(providedId: number) {
    var showBook = this.bookDbService.getBook(providedId);
    if (showBook){
      this.book = showBook;
    } else {
      this.book = this.defaultBook;
    }
  }

  assumeLoggedIn(): boolean {
    return localStorage.getItem("username") !== null
  }
}
