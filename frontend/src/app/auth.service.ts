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

// a stand-in class for what will eventually be the db stuff
class DB{
  users: User[];

  constructor(users: User[]){
    this.users = users;
  }

  hasUser(username: string): boolean {
    return this.users.filter((u) => u.name === username).length > 0
  }

  addUser(user: User){
    this.users.push(user)
  }

  getUserByCreds(username: string, password: string): User | undefined {
    // will eventually be an API call
    return this.users.filter((u)=>
      u.name === username && u.password === password
    )[0]
  }

  validCreds(username: string, password: string): boolean {
    return this.getUserByCreds(username, password) !== null
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {

  // TEMP
  db = new DB([new User("username", "password", UserRole.Patron)])

  login(username: string, password: string): boolean {
    var validUser = this.db.getUserByCreds(username, password)
    if (validUser){
      localStorage.setItem("username", username)
      localStorage.setItem("userRole", validUser.role)
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
  }

  signUp(username: string, password: string, signuprole: UserRole){
    if (this.db.hasUser(username)){
      alert("Account already exists.");
      return false
    };
    this.db.addUser(new User(username, password, signuprole))
    console.log("users:"); console.log(this.db.users) // temp
    return true
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
