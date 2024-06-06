import { Injectable } from '@angular/core';
import { Book, BookFields } from './book.model';

@Injectable({
  providedIn: 'root'
})
export class BookDbService {

  constructor() {
    this.initBooks();
  }

  // TEMP: will be replaced by the db
  initBooks(){
    var books = [
      new Book({
        title: "Esther",
        author: "Mordecai",
        publisher: "Zondervan",
        publicationDate: "1924",
        id: 0,
        image: "generic.png",
        currentBorrower: "Xerxes",
        duedate: "5/5/5",
        visible: true
      }),
      new Book({
        title: "Daniel",
        author: "Daniel",
        publisher: "Penguin",
        publicationDate: "1833",
        id: 1,
        image: "generic.png",
        currentBorrower: null,
        duedate: null,
        visible: true
      }),
      new Book({
        title: "Ecclesiastes",
        author: "Solomon",
        publisher: "Simon & Schuster",
        publicationDate: "1234",
        id: 2,
        image: "generic.png",
        currentBorrower: null,
        duedate: null,
        visible: true
      }),
      new Book({
        title: "Nehemiah",
        author: "Nehemiah",
        publisher: "Wallton Group",
        publicationDate: "700 BC",
        id: 3,
        image: "generic.png",
        currentBorrower: null,
        duedate: null,
        visible: false
      })
    ]
    localStorage.setItem('books', JSON.stringify(books))
  }

  getAllBooks(): Book[] {
    var retrievedBooks = localStorage.getItem('books');
    if (retrievedBooks){
      return JSON.parse(retrievedBooks).map((x: Object) =>
        new Book(x as BookFields)
        // have to call `new` for Book to init with its methods
      );
    } else {
      return [];
    }
  }

  getBook(id: number): Book | null {
    var foundBook = this.getAllBooks().filter((b) =>
      b.id == id // == is needed here, rather than ===
    )[0]
    if (foundBook) return foundBook;
    return null;
  }

  borrowBook(id: number, duedate: string): boolean {
    var books = this.getAllBooks();
    var book = books.filter((b) => b.id == id)[0];
    if (book === null){
      console.log("No book!")
      return false;
    }
    var username = localStorage.getItem('username');
    if (username === null) {
      console.log("No user!")
      return false;
    }
    book.currentBorrower = localStorage.getItem('username');
    book.duedate = duedate;
    localStorage.setItem('books', JSON.stringify(books));
    return true;
  }

  updateBook(book: Book){
    var books = this.getAllBooks();
    var existingBook = books.filter((b) => b.id == book.id)[0];
    if (existingBook === null){
      console.log("No book!")
      return false;
    }
    var restOfBooks = books.filter((b) => b.id != book.id);
    restOfBooks.push(book);
    var newBookList = restOfBooks;
    localStorage.setItem('books', JSON.stringify(newBookList));
    return true;
  }
}
