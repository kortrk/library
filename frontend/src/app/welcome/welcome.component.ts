import { Component, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { SimpleBookComponent } from '../simple-book/simple-book.component';

@Component({
  selector: 'welcome',
  standalone: true,
  imports: [SimpleBookComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {
  books: Book[];

  bookDbService: BookDbService;

  constructor(){
    this.bookDbService = inject(BookDbService);

    this.books = this.bookDbService.getRandomBooks(5);
  }
}
