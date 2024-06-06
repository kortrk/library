import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { RouterLink } from '@angular/router';
import { ReviewHelperService } from '../review-helper.service';
import { UserRole } from '../auth.service';

@Component({
  selector: 'display-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: Book;

  reviewHelperService: ReviewHelperService;

  constructor(){
    this.book = new Book({
      title: "Esther",
      author: "Mordecai",
      publisher: "Thomas Nelson",
      publicationDate: "1924",
      id: 0,
      image: "generic.png",
      currentBorrower: null,
      duedate: null
    });

    this.reviewHelperService = inject(ReviewHelperService);
  }

  assumeLoggedIn(): boolean {
    return localStorage.getItem("username") !== null
  }

  assumeLibrarian(): boolean {
    return localStorage.getItem("userRole") === UserRole.Librarian;
  }

  averageUserRating(bookId: number): string {
    return this.reviewHelperService.averageUserRating(bookId);
  }
}
