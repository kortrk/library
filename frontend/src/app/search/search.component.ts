import { Component, inject } from '@angular/core';
import { Book } from '../book.model';
import { DisplayBookComponent } from '../display-book/display-book.component'
import { FormsModule, NgModel } from '@angular/forms';
import { BookDbService } from '../book-db.service'
import { AuthHelperService } from '../auth-helper.service';
import { BookWithRating } from '../book-with-rating.model';

@Component({
  selector: 'search',
  standalone: true,
  imports: [DisplayBookComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  bookDbService: BookDbService;
  searchResults: BookWithRating[];
  books: BookWithRating[];
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
    this.searchResults = [];
    this.books = [];
    this.showAdvancedSearch = false;
    this.sortBy = SortType.ISBN;
    this.titleSearch = "";
    this.authorSearch = "";
    this.availSearch = AvailType.All;
    this.authHelperService = inject(AuthHelperService);
  }

  /**
   * This function exists for demo purposes and
   * would not be present on a real library website.
   */
  allBooks(){
    this.bookDbService.getAllBooks()
    .subscribe(books =>{
      var books = books.map((b) => new BookWithRating(b));
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
      var books = books.map((b) => new BookWithRating(b));
      this.searchResults = books;
      this.filter(this.searchResults);
    });
  }

  filter(books: BookWithRating[]){
    var filtered = this.filterByAuthor(
      this.filterByAvailability(
        books
      )
    )
    this.books = this.sort(filtered)
  }

  filterByAuthor(books: BookWithRating[]): BookWithRating[] {
    return books.filter(
      (b) => b.author.toLowerCase().includes(this.authorSearch.toLowerCase())
    )
  }

  filterByAvailability(books: BookWithRating[]): BookWithRating[] {
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

  sort(books: BookWithRating[]): BookWithRating[] {
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

  shouldHideBook(book: Book): boolean {
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