import { Injectable } from '@angular/core';
import { Review, ReviewFields } from './review.model';
import { HttpClient } from '@angular/common/http';
import { Config, HttpResponse } from '../constants/general-consts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewDbService {

  constructor(private http: HttpClient) {}

  getReviewsFor(bookId: number): Observable<Review[]> {
    return this.http.get<Review[]>(Config.backendUrl + `reviews/book/${bookId}`)
  }

  submitReview(newReview: Review): Observable<HttpResponse>{
    return this.http.put<HttpResponse>(
      Config.backendUrl + "reviews/create",
      newReview,
      {withCredentials: true}
    )
  }
}
