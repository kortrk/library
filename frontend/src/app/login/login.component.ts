import { Component } from '@angular/core';
import { AuthService } from '../auth.service'

@Component({
  selector: 'login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(public authService: AuthService){}

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
      
}
