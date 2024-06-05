export class Rating{
  value: number;
  displayStr: string;

  constructor(value: number, displayStr: string){
    this.value = value;
    this.displayStr = displayStr;
  }
}

export interface ReviewFields {
  rating: number;
  text: string;
  bookId: number;
  username: string;
}

export class Review {
  rating: number;
  text: string;
  bookId: number;
  username: string;

	constructor(reviewFields: ReviewFields) {
    this.rating = reviewFields.rating;
    this.text = reviewFields.text;
    this.bookId = reviewFields.bookId;
    this.username = reviewFields.username;
  }
}
