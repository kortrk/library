import { Injectable } from '@angular/core';

enum UserType {Customer, Librarian};

@Injectable({providedIn: 'root'})
export class AuthService {

  login(username: string, password: string): boolean {
    if (this.validCredentials(username, password)){
      localStorage.setItem("username", username)
      localStorage.setItem("usertype", String(UserType.Customer))
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("usertype")
  }

  validCredentials(username: string, password: string): boolean {
    // will eventually be an API call
    return username === "username" && password == "password"
  }

  loggedIn(): boolean {
    // will replace to use an HTTP-Only cookie
    return (localStorage.getItem("username") !== null)
  }

  userType(): UserType | void {
    // will replace to use an HTTP-Only cookie
    if (this.loggedIn()){
      return Number(localStorage.getItem("usertype"))
    }
    // else don't return
  }

  getUsername(): string | null {
    return localStorage.getItem("username")
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
