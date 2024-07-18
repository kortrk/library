import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config, HttpLoginResponse, HttpResponse } from '../constants/general-consts';

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

  getCurrentUser(): string | null {
    // uses the Http-Only token to find the user in the db
    return localStorage.getItem('username');
  }

  validCreds(username: string, password: string): boolean {
    return this.getUserByCreds(username, password) !== null
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient){}

  // TEMP
  db = new DB([new User("username", "password", UserRole.Patron)])

  login(username: string, password: string): boolean {
    this.http.get<HttpLoginResponse>(
      `${Config.backendUrl}auth/login`,
      {
        headers: {
          'Authorization': `Simple ${username}:${password}`,
        },
        withCredentials: true
      }
    ).subscribe(res => {
      if (res.success == false){
        alert("Incorrect credentials")
        return false
      } else {
        // we'll store these to help us guess which buttons
        // should be displayed, but we'll check everything
        // against the db before taking backend action
        localStorage.setItem("username", username)
        localStorage.setItem("userRole", res.role)

        // a cookie is returned with the auth token, so
        // future requests will automatically validate

        return true
      }
    })

    return false
  }

  logout(){
    localStorage.removeItem("username");
    localStorage.removeItem("userRole");
  }

  signUp(username: string, password: string, signuprole: UserRole): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(`${Config.backendUrl}auth/signup`, {name: username, password: password, role: signuprole})
  }

  // TEMP - replace to use the Http-Only token
  loggedIn(): boolean {
    return localStorage.getItem('username') !== null;
  }

  // TEMP - replace to use the Http-Only token
  isLibrarian(): boolean {
    return localStorage.getItem('userRole') === UserRole.Librarian;
  }

  getCurrentUser(): string | null {
    return this.db.getCurrentUser();
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
