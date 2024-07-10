import { Component, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { SimpleBookComponent } from '../simple-book/simple-book.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'welcome',
  standalone: true,
  imports: [SimpleBookComponent, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  books: Book[] = [];
  loading: boolean = false;

  bookDbService: BookDbService;

  constructor(private http: HttpClient){
    this.bookDbService = inject(BookDbService);

    this.getRandomBooks(5);
  }

  getRandomBooks(count: number, incl_unavailable: boolean = false){
    this.loading = true;
    this.http
    .get<Book[]>(`http://127.0.0.1:3000/books/random/${count}`)
    .subscribe(books => {
      this.books = books.map((info) => new Book(info));
      this.loading = false;
    });
  }
}
