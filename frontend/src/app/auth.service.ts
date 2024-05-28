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

  signUp(username: string, password: string, signuprole: string){
    if (this.validLogins.has(username)){
      alert("Account already exists.");
      return false
    };
    this.validLogins.set(username, password)
    return true
  }

  // TEMP
  validLogins = new Map<string, string>([
    ["username", "password"]
  ]);

  validCredentials(username: string, password: string): boolean {
    // will eventually be an API call
    return this.validLogins.has(username) && (
      this.validLogins.get(username) === password
    )
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
