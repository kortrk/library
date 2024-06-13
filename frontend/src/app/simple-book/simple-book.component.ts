import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookHelperService } from '../book-helper.service';

@Component({
  selector: 'simple-book',
  standalone: true,
  imports: [],
  templateUrl: './simple-book.component.html',
  styleUrl: './simple-book.component.css'
})
export class SimpleBookComponent {
  @Input() book: Book;

  bookHelperService: BookHelperService;

  constructor(){
    this.bookHelperService = inject(BookHelperService);

    this.book = this.bookHelperService.genericBook();
  }
}
