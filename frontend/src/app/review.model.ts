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

  static validRatings: Rating[] = [
    new Rating(1, "1 ☆"),
    new Rating(2, "2 ☆☆"),
    new Rating(3, "3 ☆☆☆"),
    new Rating(4, "4 ☆☆☆☆"),
    new Rating(5, "5 ☆☆☆☆☆")
  ];

  constructor(reviewFields: ReviewFields) {
    this.rating = reviewFields.rating;
    this.text = reviewFields.text;
    this.bookId = reviewFields.bookId;
    this.username = reviewFields.username;
  }

  prettyRating(): string {
    var result = Review.validRatings.filter((r: Rating) =>
      r.value === this.rating
    )[0];
    if (result !== null){
      return result.displayStr
    } else {
      return String(this.rating);
    }
  }
}
