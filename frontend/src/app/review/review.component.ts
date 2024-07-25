import { Component, Input, inject } from '@angular/core';
import { Rating, ReviewFields, Review } from '../review.model';
import { RouterLink, Router } from '@angular/router';
import { ReviewDbService } from '../review-db.service';
import { AuthService } from '../auth.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'review',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  bookTitle: string = "Example";
  bookId: number = 0;

  userRating: number = 5;
  userText: string = "";

  reviewDbService: ReviewDbService;

  ratingValues = Review.validRatings; // for the select element to use

  constructor(private router: Router, private authService: AuthService){
    this.reviewDbService = inject(ReviewDbService);
  }

  updateRating(value: number){
    this.userRating = value;
  }

  submitReview(){
    var review = new Review({
      rating: Number(this.userRating),
      text: this.userText,
      bookId: this.bookId,
      username: "" // will be set on backend
    });
    this.reviewDbService.submitReview(review)
    .subscribe(res => {
      if (res.success){
        alert("Thanks for your review!");
        this.router.navigate(['/details', {id: this.bookId}]);
      } else {
        alert(`Something went wrong: ${res.msg}`)
      }
    })
  }

  cancelReview(){
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
