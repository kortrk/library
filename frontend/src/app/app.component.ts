import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DisplayBookComponent } from './display-book/display-book.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component'
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

  authHelperService: AuthHelperService;

  constructor(private router: Router){
    this.authHelperService = inject(AuthHelperService);
  }

  assumeLoggedIn(): boolean {
    return this.authHelperService.assumeLoggedIn();
  }

  assumedUsername(): string | null {
    return this.authHelperService.assumedUsername();
  }

  ngOnInit() {
    // cosmetic: scroll to top of page when navigating
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0)
    });
  }
}
