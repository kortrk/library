import { Injectable } from '@angular/core';
import { UserRole } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHelperService {

  constructor() { }

  // Reminder:
  // all of these are assumptions because they
  // could be maniuplated by the user

  assumeLoggedIn(): boolean {
    return localStorage.getItem("username") !== null
  }

  assumeLibrarian(): boolean {
    return localStorage.getItem("userRole") === UserRole.Librarian;
  }

  assumedUsername(): string | null {
    return localStorage.getItem("username")
  }

  assumedRole(): string | null {
    return localStorage.getItem("role")
  }
}
