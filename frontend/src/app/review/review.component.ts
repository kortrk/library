import { Component, Input } from '@angular/core';
import { Review, Rating } from '../review.model';
import { RouterLink, Router } from '@angular/router';

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

  ratingValues = [
    new Rating(1, "1 ☆"),
    new Rating(2, "2 ☆☆"),
    new Rating(3, "3 ☆☆☆"),
    new Rating(4, "4 ☆☆☆☆"),
    new Rating(5, "5 ☆☆☆☆☆")
  ]; // for the select element to use

  constructor(private router: Router){}

  submitReview(userRating: HTMLSelectElement, userText: HTMLTextAreaElement){
    var review = new Review(Number(userRating.value), userText.value, this.bookId);
    alert("Thanks for your review!")
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
