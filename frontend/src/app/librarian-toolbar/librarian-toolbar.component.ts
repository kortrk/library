import { Component, inject } from '@angular/core';
import { BookDbService } from '../book-db.service';
import { AuthHelperService } from '../auth-helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'librarian-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './librarian-toolbar.component.html',
  styleUrl: './librarian-toolbar.component.css'
})
export class LibrarianToolbarComponent {
  bookDbService: BookDbService;
  authHelperService: AuthHelperService;

  constructor(private router: Router){
    this.bookDbService = inject(BookDbService);
    this.authHelperService = inject(AuthHelperService);
  }

  createBook(){
    this.router.navigate(['edit-book/']);
  }

  assumeLibrarian(): boolean {
    return this.authHelperService.assumeLibrarian();
  }
}
