import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { BookWithRating } from './book-with-rating.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config, HttpResponse } from '../constants/general-consts';

@Injectable({
  providedIn: 'root'
})
export class BookDbService {

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<BookWithRating[]> {
    return this.http.get<BookWithRating[]>(Config.backendUrl + `books/`)
  }

  getBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(Config.backendUrl + `books/${id}`)
    // could expand this to be getBooks in the future; it would
    // accept multiple ids
  }

  search(query: string): Observable<BookWithRating[]> {
    return this.http.get<BookWithRating[]>(Config.backendUrl + `books/search/${query}`)
  }

  checkOutBook(id: number): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(Config.backendUrl + `books/check_out/${id}`, null, {withCredentials: true})
  }

  /**
   * @returns
   ** type `string` if successful
   ** type `null` if unsuccessful
   */
  saveBook(book: Book): Observable<HttpResponse> {
    return this.http.put<HttpResponse>(
      Config.backendUrl + `books/upsert`,
      book,
      {withCredentials: true}
    )
  }

  removeBook(id: number): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(
      Config.backendUrl + `books/remove/${id}`,
      null,
      {withCredentials: true}
    )
  }

  /**
   * @param count how many random books you want
   */
  getRandomBooks(count: number): Observable<BookWithRating[]> {
    return this.http.get<BookWithRating[]>(Config.backendUrl + `books/random/${count}`)
  }
}
