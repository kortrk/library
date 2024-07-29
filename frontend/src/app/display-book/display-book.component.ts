import { Component, HostBinding, Input, inject } from '@angular/core';
import { Book } from '../book.model';
import { BookWithRating } from '../book-with-rating.model';
import { RouterLink } from '@angular/router';
import { UserRole } from '../auth.service';
import { AuthHelperService } from '../auth-helper.service';
import { BookHelperService } from '../book-helper.service';

@Component({
  selector: 'display-book',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './display-book.component.html',
  styleUrl: './display-book.component.css'
})
export class DisplayBookComponent {
  @Input() book: BookWithRating;

  authHelperService: AuthHelperService;
  bookHelperService: BookHelperService;

  @HostBinding('attr.class') cssClass = 'item'; // from Semantic UI

  constructor(){
    this.authHelperService = inject(AuthHelperService);
    this.bookHelperService = inject(BookHelperService);

    this.book = this.bookHelperService.genericBookWithRating();
  }

  assumeLoggedIn(): boolean {
    return this.authHelperService.assumeLoggedIn();
  }

  assumeLibrarian(): boolean {
    return this.authHelperService.assumeLibrarian();
  }
}
