import { Injectable } from '@angular/core';
import { Book } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookHelperService {

  constructor() { }

  genericBook(): Book {
    var placeholderStr = "--Placeholder--"
    return new Book({
      title: placeholderStr,
      author: placeholderStr,
      publisher: placeholderStr,
      publicationDate: placeholderStr,
      id: 0,
      coverImage: "generic.png",
      currentBorrower: null,
      duedate: null,
      visible: false
    })
  }
}
