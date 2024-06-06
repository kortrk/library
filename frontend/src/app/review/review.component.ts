import { Component, Input, inject } from '@angular/core';
import { Rating, ReviewFields, Review } from '../review.model';
import { RouterLink, Router } from '@angular/router';
import { ReviewDbService } from '../review-db.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'review',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  bookTitle: string = "Example";
  bookId: number = 0;

  reviewDbService: ReviewDbService;

  ratingValues = Review.validRatings; // for the select element to use

  constructor(private router: Router, private authService: AuthService){
    this.reviewDbService = inject(ReviewDbService);
  }

  submitReview(userRating: HTMLSelectElement, userText: HTMLTextAreaElement){
    var username = this.authService.getCurrentUser();
    if (username === null) return;
    var review = new Review({
      rating: Number(userRating.value),
      text: userText.value,
      bookId: this.bookId,
      username: username
    });
    this.reviewDbService.submitReview(review);
    alert("Thanks for your review!");
    this.router.navigate(['/search']);
  }

  @Input()
  set id(providedId: number) {
    this.bookId = Number(providedId);
  }

  @Input()
  set title(providedTitle: string) {
    this.bookTitle = providedTitle;
  }
}
