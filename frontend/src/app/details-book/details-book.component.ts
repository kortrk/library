import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { RouterLink } from '@angular/router';
import { ReviewDbService } from '../review-db.service';
import { Review } from '../review.model';

@Component({
  selector: 'details-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {
  bookDbService: BookDbService;
  reviewDbService: ReviewDbService;
  book: Book;
  defaultBook: Book;
  reviews: Review[];

  constructor(){
    this.bookDbService = inject(BookDbService);
    this.reviewDbService = inject(ReviewDbService);
    this.defaultBook = new Book({
      title: 'string',
      author: 'string',
      publisher: 'string',
      publication_date: 'string',
      id: 0,
      image: 'string',
      duedate: 'string',
      currentBorrower: null
    });
    this.book = this.defaultBook;
    this.reviews = this.reviewDbService.getReviewsFor(0);
  }

  @Input()
  set id(providedId: number) {
    var showBook = this.bookDbService.getBook(providedId);
    if (showBook){
      this.book = showBook;
      this.reviews = this.reviewDbService.getReviewsFor(providedId);
    } else {
      this.book = this.defaultBook;
    }
  }

  assumeLoggedIn(): boolean {
    return localStorage.getItem("username") !== null
  }
}
