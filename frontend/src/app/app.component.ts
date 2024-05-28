import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DisplayBookComponent } from './display-book/display-book.component';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    DisplayBookComponent,
    LoginComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
