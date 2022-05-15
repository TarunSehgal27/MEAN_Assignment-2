import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../AuthenticationService';

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
}

@Component({
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  details = {
    username: '',
    email: '',
    _id: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.auth.profile(localStorage.getItem('username')).subscribe(
      (res: any) => {
        // console.log(res);
        this.details = res.user;
      },
      (err: any) => {
        console.error(err);
      }
    );
  }

  logout() {
    localStorage.removeItem('username');
    this.router.navigateByUrl('/');
  }
}
