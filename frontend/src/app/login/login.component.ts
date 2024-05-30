import { Component } from '@angular/core';
import { AuthService, UserRole } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  paneSelection: string

  userRoles = Object.values(UserRole); // for the <select> dropdown to use

  constructor(public authService: AuthService){
    this.paneSelection = "login"
  }

  login(username: HTMLInputElement, password: HTMLInputElement): boolean{
    if (!this.authService.login(username.value, password.value)) {
      alert('Incorrect credentials.');
    }
    return false;
  }

  logout(){
    this.authService.logout()
  }

  signUp(username: HTMLInputElement, password: HTMLInputElement, signuprole: HTMLSelectElement){
    if (this.authService.signUp(username.value, password.value, signuprole.value as UserRole)){
      this.login(username, password)
    }
  }
}
