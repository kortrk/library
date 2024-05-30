import { Component } from '@angular/core';
import { Book } from '../book.model';
import { DisplayBookComponent } from '../display-book/display-book.component'
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'search',
  standalone: true,
  imports: [DisplayBookComponent, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  allBooks: Book[]
  books: Book[]
  showAdvancedSearch: boolean
  sortBy: SortType

  sortTypes = Object.values(SortType)

  constructor(){
    this.allBooks = [
      new Book(
        "Esther",
        "Mordecai",
        "Zondervan",
        "1924",
        "generic.png"
      ),
      new Book(
        "Daniel",
        "Daniel",
        "Penguin",
        "1833",
        "generic.png"
      ),
      new Book(
        "Ecclesiastes",
        "Solomon",
        "Simon & Schuster",
        "1234",
        "generic.png"
      )
    ]
    this.books = this.allBooks;
    this.showAdvancedSearch = false;
    this.sortBy = SortType.Title;

    // establish default order and filter
    this.sort()
  }

  filter(titleSearch: HTMLInputElement, authorSearch: HTMLInputElement){
    this.books = this.allBooks.filter(
      (b) => b.author.includes(authorSearch.value)
    ).filter(
      (b) => b.title.includes(titleSearch.value)
    )
    this.sort()
  }

  sort(){
    this.books = this.books.sort((a, b) =>{
      if (this.sortBy === SortType.Title){
        return a.title < b.title ? -1 : 1
      } else if (this.sortBy === SortType.Author){
        return a.author < b.author ? -1 : 1
      }
      return 0;
    })
  }

  toggleAdvancedSearch(){
    this.showAdvancedSearch = !this.showAdvancedSearch;
  }

  clearSearch(titleSearch: HTMLInputElement, authorSearch: HTMLInputElement){
    titleSearch.value = "";
    authorSearch.value = "";
    this.filter(titleSearch, authorSearch)
  }

  titleSearchInUse(titleSearch: HTMLInputElement): boolean{
    return titleSearch.value.length > 0
  }

  authorSearchInUse(authorSearch: HTMLInputElement): boolean{
    return authorSearch.value.length > 0
  }
}

export enum SortType{
  Title = "Title",
  Author = "Author",
  Availability = "Availability"
}