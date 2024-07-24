import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookDbService } from '../book-db.service';
import { RouterLink } from '@angular/router';
import { ReviewDbService } from '../review-db.service';
import { Review } from '../review.model';
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
  averageRating: string;
  loading: boolean = true;
  notFound: boolean = false;

  bookDbService: BookDbService;
  reviewDbService: ReviewDbService;
  authHelperService: AuthHelperService;
  bookHelperService: BookHelperService;

  constructor(){
    this.bookDbService = inject(BookDbService);
    this.reviewDbService = inject(ReviewDbService);
    this.authHelperService = inject(AuthHelperService);
    this.bookHelperService = inject(BookHelperService);

    this.defaultBook = this.bookHelperService.genericBook();

    this.book = this.defaultBook;
    this.reviews = [];
    this.averageRating = "";
  }

  @Input()
  set id(providedId: number) {
    this.bookDbService.getBook(providedId)
    .subscribe(books => {
      var books = books.map((b) => new Book(b));
      if (books.length > 0){
        this.book = books[0];
        this.reviewDbService.getReviewsFor(providedId)
        .subscribe(reviews => {
          this.reviews = reviews.map((r) => new Review(r));
          this.averageRating = this.calculateAvgRating(this.reviews)
        })
      } else {
        this.notFound = true;
      }
      this.loading = false;
    });
  }

  assumeLoggedIn(): boolean {
    return this.authHelperService.assumeLoggedIn();
  }

  calculateAvgRating(reviews: Review[]): string {
    if (reviews.length === 0) return "--";
    var sum = reviews.reduce((accumulator, currentValue) =>
      accumulator + currentValue.rating, 0
    );
    var avg = sum/reviews.length;
    return String(avg.toFixed(1));
  }
}
