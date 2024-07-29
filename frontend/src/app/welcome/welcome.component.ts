import { Component, inject } from '@angular/core';
import { BookDbService } from '../book-db.service';
import { SimpleBookComponent } from '../simple-book/simple-book.component';
import { CommonModule } from '@angular/common';
import { BookWithRating } from '../book-with-rating.model';

@Component({
  selector: 'welcome',
  standalone: true,
  imports: [SimpleBookComponent, CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  books: BookWithRating[] = [];
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
      this.books = books.map((b) => new BookWithRating(b));
      this.loading = false;
    });
  }
}
