import { Injectable, inject } from '@angular/core';
import { Book, BookFields } from './book.model';
import { BookHelperService } from './book-helper.service';
import { BookInitHelperService } from './book-init-helper.service';
import { isEqual, max, sampleSize } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from '../constants/general-consts';

@Injectable({
  providedIn: 'root'
})
export class BookDbService {
  bookHelperService: BookHelperService;
  bookInitHelperService: BookInitHelperService;

  constructor(private http: HttpClient) {
    this.bookHelperService = inject(BookHelperService);
    this.bookInitHelperService = inject(BookInitHelperService);

    this.initBooks();
  }

  // TEMP: will be replaced by the db
  initBooks(){
    console.log("initializing books")
    var books = this.bookInitHelperService.generateBooks();
    localStorage.setItem('books', JSON.stringify(books));
  }

  getAllBooks(): Book[] {
    var retrievedBooks = localStorage.getItem('books');
    if (retrievedBooks){
      return JSON.parse(retrievedBooks).map((x: Object) =>
        new Book(x as BookFields)
        // have to call `new` for Book to init with its methods
      );
    } else {
      return [];
    }
  }

  getBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${Config.dbHost}books/${id}`)
    // could expand this to be getBooks in the future; it would
    // accept multiple ids
  }

  borrowBook(id: number, duedate: string): boolean {
    var books = this.getAllBooks();
    var book = books.filter((b) => b.id == id)[0];
    if (book === null){
      console.log("No book!")
      return false;
    }
    var username = localStorage.getItem('username');
    if (username === null) {
      console.log("No user!")
      return false;
    }
    book.currentBorrower = localStorage.getItem('username');
    book.duedate = duedate;
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }

  /**
   * @returns
   ** type `string` if successful
   ** type `null` if unsuccessful
   */
  saveBook(book: Book): string | null {
    var info = "Updated";
    var books = this.getAllBooks();
    var existingBook = books.filter((b) => b.id == book.id)[0];
    if (existingBook === undefined){
      info = "Created";
    }
    if (isEqual(book, existingBook)) return 'No change!';
    var restOfBooks = books.filter((b) => b.id != book.id);
    restOfBooks.push(book);
    var newBookList = restOfBooks;
    localStorage.setItem('books', JSON.stringify(newBookList));
    return `${info} successfully`;
  }

  /**
   * temporary - backend will handle this
   */
  getNextId(): number {
    var books = this.getAllBooks();
    var id;
    if (books.length == 0){
      id = 0;
    } else {
      var highestId = max(books.map((b) => b.id));
      if (highestId === undefined) return 0; // shouldn't actually happen
      id = highestId + 1;
    }
    return id;
  }

  removeBook(id: number): boolean {
    var books = this.getAllBooks();
    var finalBooks = books.filter((x) => x.id != id)
    localStorage.setItem('books', JSON.stringify(finalBooks));
    return true;
  }

  /**
   * @param count how many random books you want
   */
  getRandomBooks(count: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${Config.dbHost}books/random/${count}`)
  }
}
