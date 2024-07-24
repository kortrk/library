import { Injectable } from '@angular/core';
import { Review, ReviewFields } from './review.model';
import { HttpClient } from '@angular/common/http';
import { Config, HttpResponse } from '../constants/general-consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewDbService {

  constructor(private http: HttpClient) {
    this.initReviews();
  }

  // TEMP: will be replaced by the db
  initReviews(){
    console.log("initializing reviews");
    var reviews: Review[] = [
      new Review({
        rating: 4,
        text: "Good!",
        bookId: 0,
        username: "username"
      }),
      new Review({
        rating: 5,
        text: "Thought-provoking",
        bookId: 2,
        username: "Rehoboam"
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

  getReviewsFor(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(Config.backendUrl + `reviews/book/${bookId}`)
  }

  submitReview(newReview: Review): Observable<HttpResponse>{
    return this.http.put<HttpResponse>(Config.backendUrl + "reviews/create", newReview, {withCredentials: true})
  }
}
