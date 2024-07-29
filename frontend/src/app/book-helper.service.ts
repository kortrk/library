import { Injectable } from '@angular/core';
import { Book, BookFields } from './book.model';
import { BookWithRating, BookWithRatingFields } from './book-with-rating.model';

@Injectable({
  providedIn: 'root'
})
export class BookHelperService {
  placeholderStr: string = "--Placeholder--";
  bookInfo: Object;

  constructor() {
    this.bookInfo = {
      title: this.placeholderStr,
      author: this.placeholderStr,
      description: this.placeholderStr,
      publisher: this.placeholderStr,
      publicationDate: this.placeholderStr,
      category: this.placeholderStr,
      isbn: this.placeholderStr,
      pageCount: 111,
      id: null,
      coverImage: "generic.jpg",
      currentBorrower: null,
      duedate: null,
      visible: false
    }
  }

  genericBook(): Book {
    var book = new Book(this.bookInfo as BookFields);
    return book;
  }

  genericBookWithRating(): BookWithRating {
    var bookWithRatingInfo = {...this.bookInfo, ...{avgRating: 5.0}}
    var book = new BookWithRating(bookWithRatingInfo as BookWithRatingFields);
    return book;
  }
}
