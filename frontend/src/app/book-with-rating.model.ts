import { Book, BookFields } from './book.model';

export interface BookWithRatingFields extends BookFields {
  avgRating: number;
}

export class BookWithRating extends Book {
    avgRating: number

  constructor(fields: BookWithRatingFields) {
    super(fields);
    this.avgRating = fields.avgRating;
  }

  formatAvgRating(): string {
    if (!this.avgRating) return "--";
    return this.avgRating.toFixed(2);
  }
}
