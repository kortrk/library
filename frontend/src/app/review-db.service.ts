import { Injectable } from '@angular/core';
import { Review, ReviewFields } from './review.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewDbService {

  constructor() {
    this.initReviews();
  }

  // TEMP: will be replaced by the db
  initReviews(){
    console.log("initializing reviews");
    var reviews: Review[] = [
      new Review({
        rating: 4,
        text: "Good!",
        bookId: 0
      }),
      new Review({
        rating: 5,
        text: "Thought-provoking",
        bookId: 2
      })
    ]
    localStorage.setItem('reviews', JSON.stringify(reviews))
  }

  getAllReviews(): Review[] {
    var retrievedReviews = localStorage.getItem('reviews');
    if (retrievedReviews){
      return JSON.parse(retrievedReviews).map((x: Object) =>
        new Review(x as ReviewFields)
        // have to call `new` for Book to init with its methods
      );
    } else {
      return [];
    }
  }

  submitReview(newReview: Review): boolean{
    var reviews = this.getAllReviews();
    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    return true;
  }
}
