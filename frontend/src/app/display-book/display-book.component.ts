import { Component, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { RouterLink } from '@angular/router';
import { ReviewHelperService } from '../review-helper.service';
import { UserRole } from '../auth.service';
import { AuthHelperService } from '../auth-helper.service';

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
  authHelperService: AuthHelperService;

  constructor(){
    this.book = new Book({
      title: "Esther",
      author: "Mordecai",
      publisher: "Thomas Nelson",
      publicationDate: "1924",
      id: 0,
      image: "generic.png",
      currentBorrower: null,
      duedate: null,
      visible: true
    });

    this.reviewHelperService = inject(ReviewHelperService);
    this.authHelperService = inject(AuthHelperService);
  }

  assumeLoggedIn(): boolean {
    return this.authHelperService.assumeLoggedIn();
  }

  assumeLibrarian(): boolean {
    return this.authHelperService.assumeLibrarian();
  }

  averageUserRating(bookId: number): string {
    return this.reviewHelperService.averageUserRating(bookId);
  }
}
