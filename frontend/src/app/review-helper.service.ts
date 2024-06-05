import { Injectable, inject } from '@angular/core';
import { ReviewDbService } from './review-db.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewHelperService {
  reviewDbService: ReviewDbService;

  constructor() { 
    this.reviewDbService = inject(ReviewDbService);
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
