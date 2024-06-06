export interface BookFields {
  title: string;
  author: string;
  // description: string;
  // cover_image: string;
  // average_user_rating: string;
  // -- for details view --
  publisher: string;
  publicationDate: string;
  // category: string;
  // isbn: string;
  // page_count: string;
  // customer_reviews: string;
  // -- my additions --
  id: number;
  image: string;
  currentBorrower: string | null;
  duedate: string | null;
  visible: boolean;
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
    publicationDate: string;
    // category: string;
    // isbn: string;
    // page_count: string;
    // customer_reviews: string;
    // -- my additions --
    id: number;
    image: string;
    currentBorrower: string | null;
    duedate: string | null;
    visible: boolean; // controls whether book appears to customers

	constructor(bookFields: BookFields) {
    this.title = bookFields.title;
    this.author = bookFields.author;
    this.publisher = bookFields.publisher;
    this.publicationDate = bookFields.publicationDate;
    this.id = bookFields.id;
    this.image = bookFields.image;
    this.currentBorrower = bookFields.currentBorrower;
    this.duedate = bookFields.duedate;
    this.visible = bookFields.visible;
  }

  imgLoc(): string {
    return `assets/images/${this.image}`
  }

  currentlyBorrowed(): boolean {
    return this.currentBorrower !== null;
  }
}

// ["title", "author", "description", "cover_image", "average_user_rating", "publisher", "publication_date", "category", "isbn", "page_count", "customer_reviews"]