import { Component, Input } from '@angular/core';
import { Book } from '../book.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'display-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: Book;

  constructor(){
    this.book = new Book({
      title: "Esther",
      author: "Mordecai",
      publisher: "Thomas Nelson",
      publication_date: "1924",
      id: 0,
      image: "generic.png",
      currentBorrower: null,
      duedate: null
    });
  }
}
