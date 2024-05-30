import { Injectable } from '@angular/core';

export enum UserRole {Patron = "patron", Librarian = "librarian"};

class User{
  name: string;
  password: string;
  role: UserRole;

  constructor(name: string, password: string, role: UserRole){
    this.name = name;
    this.password = password;
    this.role = role;
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // TEMP
  users: User[] = [
    new User("username", "password", UserRole.Patron)
  ]

  login(username: string, password: string): boolean {
    var validUser = this.findValidUser(username, password)
    if (validUser){
      localStorage.setItem("username", username)
      localStorage.setItem("userRole", validUser.role)
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("userRole")
  }

  signUp(username: string, password: string, signuprole: UserRole){
    var userExists = this.users.filter((u)=> u.name === username).length > 0
    if (userExists){
      alert("Account already exists.");
      return false
    };
    this.users.push(new User(username, password, signuprole))
    console.log("users:"); console.log(this.users)
    return true
  }

  findValidUser(username: string, password: string): User | undefined {
    // will eventually be an API call
    return this.users.filter((u)=>
      u.name === username && u.password === password
    )[0]
  }

  getUsername(): string | null {
    return localStorage.getItem("username")
  }

  getUserRole(): UserRole | null {
    // will replace to pull directly from an HTTP-Only cookie
    var role = localStorage.getItem("userRole");
    if (role){
      return role as UserRole;
    } else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    // will replace to use an HTTP-Only cookie
    return (this.getUsername() !== null)
  }

  isLibrarian(): boolean {
    return this.getUserRole() === UserRole.Librarian;
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
