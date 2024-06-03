import { Component, Input } from '@angular/core';
import { Book } from '../book.model'

@Component({
  selector: 'display-book',
  standalone: true,
  imports: [],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: Book;
  detailsView: boolean = false;

  constructor(){
    this.book = new Book({
      title: "Esther",
      author: "Mordecai",
      publisher: "Thomas Nelson",
      publication_date: "1924",
      id: 0,
      image: "generic.png",
      currentBorrower: null
    });
  }

  toggleDetailsView(){
    this.detailsView = !this.detailsView;
  }

  assumeLoggedIn(): boolean {
    console.log(`checking for login: ${localStorage.getItem("username")}`)
    return localStorage.getItem("username") !== null
  }
}
