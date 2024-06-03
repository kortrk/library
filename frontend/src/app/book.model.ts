export interface BookInfo {
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
  id: number;
  image: string;
  currentBorrower: string | null;
}

export class Book {
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
    id: number;
    image: string;
    currentBorrower: string | null;

	constructor(bookInfo: BookInfo) {
    this.title = bookInfo.title;
    this.author = bookInfo.author;
    this.publisher = bookInfo.publisher;
    this.publication_date = bookInfo.publication_date;
    this.id = bookInfo.id;
    this.image = bookInfo.image;
    this.currentBorrower = bookInfo.currentBorrower;
  }

  imgLoc(): string {
    return `assets/images/${this.image}`
  }
}

// ["title", "author", "description", "cover_image", "average_user_rating", "publisher", "publication_date", "category", "isbn", "page_count", "customer_reviews"]