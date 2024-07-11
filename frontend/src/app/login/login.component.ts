import { Component, inject } from '@angular/core';
import { AuthService, UserRole } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthHelperService } from '../auth-helper.service';

@Component({
  selector: 'login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  paneSelection: string

  authHelperService: AuthHelperService;

  userRoles = Object.values(UserRole); // for the <select> dropdown to use

  expandLogin = false

  constructor(public authService: AuthService, private router: Router){
    this.paneSelection = "login";
    this.authHelperService = inject(AuthHelperService);
  }

  login(username: HTMLInputElement, password: HTMLInputElement): boolean{
    if (!this.authService.login(username.value, password.value)) {
      alert('Incorrect credentials.');
    }
    return false;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/search']);
  }

  signUp(username: HTMLInputElement, password: HTMLInputElement, signuprole: HTMLSelectElement){
    this.authService.signUp(username.value, password.value, signuprole.value as UserRole)
    .subscribe(info =>{
      if (info.success == false){
        alert("Please fix the following issues:\n" + JSON.stringify(info.msg, null, " "))
      } else {
        // this.login(username, password)
      }
    })
  }

  // this could be manipulated - it's only an assumption
  assumeLoggedIn(): boolean {
    return this.authHelperService.assumeLoggedIn();
  }

  // this could be manipulated - it's only an assumption
  assumedUsername(): string | null {
    return this.authHelperService.assumedUsername();
  }

  // this could be manipulated - it's only an assumption
  assumedRole(): string | null {
    return this.authHelperService.assumedRole();
  }

  toggleExpandLogin(){
    this.expandLogin = !this.expandLogin;
  }
}
