import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { RouterLink } from '@angular/router';
import { ReviewDbService } from '../review-db.service';
import { Review } from '../review.model';
import { ReviewHelperService } from '../review-helper.service';
import { AuthHelperService } from '../auth-helper.service';
import { BookHelperService } from '../book-helper.service';

@Component({
  selector: 'details-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './details-book.component.html',
  styleUrl: './details-book.component.css'
})
export class DetailsBookComponent {
  book: Book;
  defaultBook: Book;
  reviews: Review[];
  loading: boolean = true;
  notFound: boolean = false;

  bookDbService: BookDbService;
  reviewDbService: ReviewDbService;
  reviewHelperService: ReviewHelperService;
  authHelperService: AuthHelperService;
  bookHelperService: BookHelperService;

  constructor(){
    this.bookDbService = inject(BookDbService);
    this.reviewDbService = inject(ReviewDbService);
    this.reviewHelperService = inject(ReviewHelperService);
    this.authHelperService = inject(AuthHelperService);
    this.bookHelperService = inject(BookHelperService);

    this.defaultBook = this.bookHelperService.genericBook();

    this.book = this.defaultBook;
    this.reviews = this.reviewDbService.getReviewsFor(0);
  }

  @Input()
  set id(providedId: number) {
    this.bookDbService.getBook(providedId)
    .subscribe(books => {
      var books = books.map((b) => new Book(b));
      if (books.length > 0){
        this.book = books[0];
        this.reviews = this.reviewDbService.getReviewsFor(providedId);
      } else {
        this.notFound = true;
      }
      this.loading = false;
    });

    // if (showBook){
    //   this.book = showBook;
    //   this.reviews = this.reviewDbService.getReviewsFor(providedId);
    // } else {
    //   this.book = this.defaultBook;
    // }
  }

  assumeLoggedIn(): boolean {
    return this.authHelperService.assumeLoggedIn();
  }

  averageRating(): string {
    return this.reviewHelperService.averageUserRating(this.book.id);
  }
}
