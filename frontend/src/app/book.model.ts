export class Book implements Book{
    // -- always showing --
    title: string;
    author: string;
    // description: string;
    // cover_image: string;
    // average_user_rating: string;
    // -- for details view --
    publisher: string;
    publication_date: string;
    // category: string;
    // isbn: string;
    // page_count: string;
    // customer_reviews: string;
    // -- my additions --
    image: string;

	constructor(
    title: string,
    author: string,
    publisher: string,
    publication_date: string,
    image: string
  ) {
    this.title = title;
    this.author = author;
    this.publisher = publisher;
    this.publication_date = publication_date;
    this.image = image;
  }

  imgLoc(): string {
    return `assets/images/${this.image}`
  }
}

// ["title", "author", "description", "cover_image", "average_user_rating", "publisher", "publication_date", "category", "isbn", "page_count", "customer_reviews"]