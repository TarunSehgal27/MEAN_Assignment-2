import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../AuthenticationService';

@Component({
  // selector: 'register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  credentials = {
    username: '',
    email: '',
    password: '',
    error: '',
  };

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(
      (res: any) => {
        // console.log('res', res);
        if (res?.newUser) {
          localStorage.setItem('username', res?.newUser?.username);
          this.router.navigateByUrl('/profile');
        } else {
          this.credentials.error = res.error;
        }
      },
      (err: any) => {
        this.credentials.error = err;
      }
    );
  }
}
