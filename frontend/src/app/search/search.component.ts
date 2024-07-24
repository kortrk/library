import { Component, inject } from '@angular/core';
import { Book } from '../book.model';
import { DisplayBookComponent } from '../display-book/display-book.component'
import { LibrarianToolbarComponent } from '../librarian-toolbar/librarian-toolbar.component';
import { FormsModule, NgModel } from '@angular/forms';
import { BookDbService } from '../book-db.service'
import { AuthHelperService } from '../auth-helper.service';

@Component({
  selector: 'search',
  standalone: true,
  imports: [DisplayBookComponent, FormsModule, LibrarianToolbarComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  bookDbService: BookDbService;
  books: Book[];
  showAdvancedSearch: boolean;
  sortBy: SortType;
  titleSearch: string;
  authorSearch: string;
  availSearch: string;

  sortTypes = Object.values(SortType);
  availTypes = Object.values(AvailType);

  authHelperService: AuthHelperService;

  constructor(){
    this.bookDbService = inject(BookDbService);
    this.books = [];
    this.showAdvancedSearch = false;
    this.sortBy = SortType.ISBN;
    this.titleSearch = "";
    this.authorSearch = "";
    this.availSearch = AvailType.All;
    this.authHelperService = inject(AuthHelperService);
  }

  allBooks(){
    this.bookDbService.getAllBooks()
    .subscribe(books =>{
      var books = books.map((b) => new Book(b));
      this.books = books;
    })
  }

  search(){
    var s = null;
    if (this.titleSearch == ""){
      s = this.bookDbService.getAllBooks()
    } else {
      s = this.bookDbService.search(this.titleSearch)
    }

    s.subscribe(books => {
      var books = books.map((b) => new Book(b));
      this.filter(books);
    });
  }

  filter(books: Book[]){
    var filtered = this.filterByAuthor(
      this.filterByAvailability(
        books
      )
    )
    this.books = this.sort(filtered)
  }

  filterByAuthor(books: Book[]): Book[] {
    return books.filter(
      (b) => b.author.includes(this.authorSearch)
    )
  }

  filterByTitle(books: Book[]): Book[] {
    return books.filter(
      (b) => b.title.includes(this.titleSearch)
    )
  }

  filterByAvailability(books: Book[]): Book[] {
    switch(this.availSearch as AvailType){
      case AvailType.In: {
        return books.filter((b) => b.currentBorrower === null)
      }
      case AvailType.Out: {
        return books.filter((b) => b.currentBorrower !== null)
      }
      default: {
        return books;
      }
    }
  }

  sort(books: Book[]): Book[] {
    return books.sort((a, b) =>{
      if (this.sortBy === SortType.Title){
        return a.title < b.title ? -1 : 1
      } else if (this.sortBy === SortType.Author){
        return a.author < b.author ? -1 : 1
      } else if (this.sortBy === SortType.Availability){
        var aOut = a.currentBorrower ? 1 : 0
        var bOut = b.currentBorrower ? 1 : 0
        return aOut < bOut ? -1 : 1
      } else if (this.sortBy === SortType.ISBN){
        return a.isbn < b.isbn ? -1 : 1
      }
      return 0;
    })
  }

  shouldHide(book: Book): boolean {
    if (book.visible) return false;
    if (this.authHelperService.assumeLibrarian()) return false;
    return true;
  }

  toggleAdvancedSearch(){
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  clearSearch(){
    this.titleSearch = "";
    this.authorSearch = "";
    this.availSearch = AvailType.All;
    this.books = [];
  }

  titleSearchInUse(): boolean{
    return this.titleSearch.length > 0
  }

  authorSearchInUse(): boolean{
    return this.authorSearch.length > 0
  }

  availSearchInUse(): boolean{
    return (this.availSearch as AvailType) !== AvailType.All
  }
}

export enum SortType{
  ISBN = "ISBN",
  Title = "Title",
  Author = "Author",
  Availability = "Availability"
}

export enum AvailType{
  In = "In",
  Out = "Out",
  All = "All"
}