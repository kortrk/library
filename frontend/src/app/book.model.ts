export interface BookFields {
  title: string;
  author: string;
  description: string;
  // -- for details view --
  publisher: string;
  publicationDate: string;
  category: string;
  isbn: string;
  pageCount: number;
  // -- my additions --
  id: number;
  coverImage: string;
  currentBorrower: string | null;
  duedate: string | null;
  visible: boolean;
}

export class Book {
    // -- always showing --
    title: string;
    author: string;
    description: string;
    coverImage: string;
    // -- for details view --
    publisher: string;
    publicationDate: string;
    category: string;
    isbn: string;
    pageCount: number;
    // -- my additions --
    id: number;
    currentBorrower: string | null;
    duedate: string | null;
    visible: boolean; // controls whether book appears to customers

	constructor(bookFields: BookFields) {
    this.title = bookFields.title;
    this.author = bookFields.author;
    this.description = bookFields.description;
    this.publisher = bookFields.publisher;
    this.publicationDate = bookFields.publicationDate;
    this.category = bookFields.category;
    this.isbn = bookFields.isbn;
    this.pageCount = bookFields.pageCount;
    this.id = bookFields.id;
    this.coverImage = bookFields.coverImage;
    this.currentBorrower = bookFields.currentBorrower;
    this.duedate = bookFields.duedate;
    this.visible = bookFields.visible;
  }

  imgLoc(): string {
    return `assets/images/${this.coverImage}`
  }

  currentlyBorrowed(): boolean {
    return this.currentBorrower !== null;
  }
}

// ["title", "author", "description", "cover_image", "average_user_rating", "publisher", "publication_date", "category", "isbn", "page_count", "customer_reviews"]