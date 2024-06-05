export class Rating{
  value: number;
  displayStr: string;

  constructor(value: number, displayStr: string){
    this.value = value;
    this.displayStr = displayStr;
  }
}

export class Review {
  rating: number;
  text: string;

  constructor(rating: number, text: string){
    this.rating = rating;
    this.text = text;
  }
}
