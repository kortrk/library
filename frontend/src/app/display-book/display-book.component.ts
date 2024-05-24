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
  detailsView: boolean = true;

  constructor(){
    this.book = new Book({
      title: "Murder on the Orient Express",
      author: "Agatha Christie",
      publisher: "Zondervan",
      publication_date: "1924"
    });
  }

  toggleDetailsView(){
    this.detailsView = !this.detailsView;
  }
}
