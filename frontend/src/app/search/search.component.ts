import { Component } from '@angular/core';
import { Book } from '../book.model';
import { DisplayBookComponent } from '../display-book/display-book.component'

@Component({
  selector: 'search',
  standalone: true,
  imports: [DisplayBookComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  books: Book[]

  constructor(){
    this.books = [
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
  }
}
