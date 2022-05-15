import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

// Interfaces here

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private router: Router) {}

  public isLoggedIn(): boolean {
    const username = localStorage.getItem('username')
    if (username) return true
    else return false
  }

  private request(
    method: 'post' | 'get',
    type: 'login' | 'register' | 'profile',
    body: any
  ): any {
    let base;

    if (method === 'post') {
      base = this.http.post(`http://localhost:3000/${type}`, body);
    } else {
      base = this.http.post(`http://localhost:3000/${type}`, body);
    }

    const request = base.pipe();

    return request;
  }

  public register(user: any) {
    return this.request('post', 'register', user);
  }

  public login(body: any): any {
    return this.request('post', 'login', body);
  }

  public profile(username: any): any {
    return this.request('get', 'profile', { username });
  }

  // public logout(): void {
  //   // window.localStorage.removeItem('mean-token');
  //   this.router.navigateByUrl('/');
  // }
}
