export interface Book{
  title: string;
  author: string;
  // description: string;
  // cover_image: string;
  // average_user_rating: string;
  // publisher: string;
  // publication_date: string;
  // category: string;
  // isbn: string;
  // page_count: string;
  // customer_reviews: string;
}

export class Book implements Book{
	constructor(obj: Book) {
    Object.assign(this, obj);
    // source: https://stackoverflow.com/a/53982272
  }
}

// ["title", "author", "description", "cover_image", "average_user_rating", "publisher", "publication_date", "category", "isbn", "page_count", "customer_reviews"]