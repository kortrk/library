import { Component } from '@angular/core';
import { Review, Rating } from '../review.model';

@Component({
  selector: 'review',
  standalone: true,
  imports: [],
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent {
  bookTitle = "Example";
  bookId = 0;

  ratingValues = [
    new Rating(1, "1 ☆"),
    new Rating(2, "2 ☆☆"),
    new Rating(3, "3 ☆☆☆"),
    new Rating(4, "4 ☆☆☆☆"),
    new Rating(5, "5 ☆☆☆☆☆")
  ]; // for the select element to use

  submitReview(userRating: HTMLSelectElement, userText: HTMLTextAreaElement){
    var review = new Review(Number(userRating.value), userText.value);
    console.log(review);
  }
}
