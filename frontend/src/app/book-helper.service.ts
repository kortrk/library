import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookHelperService {

  constructor() { }

  genericBook(): Book {
    var placeholderStr = "--Placeholder--"
    var book = new Book({
      title: placeholderStr,
      author: placeholderStr,
      description: placeholderStr,
      publisher: placeholderStr,
      publicationDate: placeholderStr,
      category: placeholderStr,
      isbn: placeholderStr,
      pageCount: 111,
      id: 0
    })
    book.coverImage = "generic.jpg";
    book.visible = false;
    return book;
  }
}
