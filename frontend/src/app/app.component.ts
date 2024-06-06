import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DisplayBookComponent } from './display-book/display-book.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component'
import { BookDbService } from './book-db.service';
import { AuthHelperService } from './auth-helper.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    DisplayBookComponent,
    LoginComponent,
    SearchComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  bookDbService: BookDbService;
  authHelperService: AuthHelperService;

  constructor(private router: Router){
    this.bookDbService = inject(BookDbService);
    this.authHelperService = inject(AuthHelperService);
  }

  createBook(){
    var newBookId = this.bookDbService.generateBook();
    if (newBookId === null){
      alert("failed to create book");
      return;
    }
    this.router.navigate(['edit-book/', {id: newBookId}]);
  }

  assumeLibrarian(): boolean {
    return this.authHelperService.assumeLibrarian();
  }
}
