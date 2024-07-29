import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config, HttpLoginResponse, HttpResponse } from '../constants/general-consts';
import { Router } from '@angular/router';

export enum UserRole {Customer = "customer", Librarian = "librarian"};

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient, private router: Router){}

  login(username: string, password: string) {
    this.http.get<HttpLoginResponse>(
      Config.backendUrl + `auth/login`,
      {
        headers: {
          'Authorization': `Simple ${username}:${password}`,
        },
        withCredentials: true // need this to receive the cookie
      }
    ).subscribe(res => {
      if (res.success == false){
        alert("Incorrect credentials")
      } else {
        // we'll store these to help us guess which buttons
        // should be displayed, but we'll check everything
        // against the db before taking backend action
        localStorage.setItem("username", username)
        localStorage.setItem("userRole", res.role)

        // a cookie is returned with the auth token, so
        // future requests will automatically validate
      }
    })
  }

  logout(){
    this.http.get<string>(
      Config.backendUrl + `auth/logout`,
      {withCredentials: true} // need this whenever we need to use cookies
    ).subscribe()             // <-- won't trigger without subscribe()

    localStorage.removeItem("username");
    localStorage.removeItem("userRole");

    this.router.navigate(['/welcome']);
  }

  signUp(username: string, password: string, signuprole: UserRole): Observable<HttpResponse> {
    return this.http.post<HttpResponse>(
      Config.backendUrl + `auth/signup`,
      {name: username, password: password, role: signuprole}
    )
  }
}

export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService, useClass: AuthService }
];
