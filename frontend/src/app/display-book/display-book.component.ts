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
    this.book = new Book(
      "Esther",
      "Mordecai",
      "Thomas Nelson",
      "1924",
      "generic.png"
    );
  }

  toggleDetailsView(){
    this.detailsView = !this.detailsView;
  }

  assumeLoggedIn(): boolean {
    console.log(`checking for login: ${localStorage.getItem("username")}`)
    return localStorage.getItem("username") !== null
  }
}
