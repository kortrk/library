import { Component, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { SimpleBookComponent } from '../simple-book/simple-book.component';
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

  constructor(){
    this.bookDbService = inject(BookDbService);
    this.getRandomBooks(5);
  }

  getRandomBooks(count: number, incl_unavailable: boolean = false){
    this.loading = true;
    this.bookDbService.getRandomBooks(count)
    .subscribe(books => {
      this.books = books.map((b) => new Book(b));
      this.loading = false;
    });
  }
}
