import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(public authService: AuthService){
    this.paneSelection = "login"
  }

  login(username: HTMLInputElement, password: HTMLInputElement): boolean{
    console.log(`Received login attempt with ${username.value} and ${password.value}`)
    if (!this.authService.login(username.value, password.value)) {
      alert('Incorrect credentials.');
    }
    return false;
  }

  logout(){
    this.authService.logout()
  }
  
  signUp(username: HTMLInputElement, password: HTMLInputElement, signuprole: HTMLSelectElement){
    if (this.authService.signUp(username.value, password.value, signuprole.value)){
      this.login(username, password)
    }
  }
}
