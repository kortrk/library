import { Injectable, inject } from '@angular/core';
import { Book, BookFields } from './book.model';
import { BookHelperService } from './book-helper.service';
import { BookInitHelperService } from './book-init-helper.service';
import { isEqual, max, sampleSize } from 'lodash';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config, HttpResponse } from '../constants/general-consts';

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

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${Config.backendUrl}books/`)
  }

  getBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${Config.backendUrl}books/${id}`)
    // could expand this to be getBooks in the future; it would
    // accept multiple ids
  }

  search(query: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${Config.backendUrl}books/search/${query}`)
  }

  checkOutBook(id: number): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${Config.backendUrl}books/check_out/${id}`, null, {withCredentials: true})
  }

  /**
   * @returns
   ** type `string` if successful
   ** type `null` if unsuccessful
   */
  saveBook(book: Book): string | null {
    var info = "Updated";
    var books: Book[] = [];
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

  removeBook(id: number): boolean {
    var books: Book[] = [];
    var finalBooks = books.filter((x) => x.id != id)
    localStorage.setItem('books', JSON.stringify(finalBooks));
    return true;
  }

  /**
   * @param count how many random books you want
   */
  getRandomBooks(count: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${Config.backendUrl}books/random/${count}`)
  }
}
