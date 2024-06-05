import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { RouterLink } from '@angular/router';
import { ReviewDbService } from '../review-db.service';

@Component({
  selector: 'display-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: Book;

  reviewDbService: ReviewDbService;

  constructor(){
    this.book = new Book({
      title: "Esther",
      author: "Mordecai",
      publisher: "Thomas Nelson",
      publication_date: "1924",
      id: 0,
      image: "generic.png",
      currentBorrower: null,
      duedate: null
    });

    this.reviewDbService = inject(ReviewDbService);
  }

  assumeLoggedIn(): boolean {
    return localStorage.getItem("username") !== null
  }

  averageUserRating(bookId: number): string {
    var reviews = this.reviewDbService.getReviewsFor(bookId);
    if (reviews.length === 0) return "--";
    var sum = reviews.reduce((accumulator, currentValue) =>
      accumulator + currentValue.rating, 0
    );
    var avg = sum/reviews.length;
    return String(avg.toFixed(1));
  }
}
