import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../AuthenticationService';

@Component({
  // selector: 'login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
    error: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  login() {
    this.auth.login(this.credentials).subscribe(
      (res: any) => {
        console.log(res);
        if (res?.emailCheck) {
          localStorage.setItem('username', res?.emailCheck.username);
          this.router.navigateByUrl('/profile');
        } else {
          this.credentials.error = res.error;
        }
      },
      (err: any) => {
        console.error(err);
      }
    );
  }
}
