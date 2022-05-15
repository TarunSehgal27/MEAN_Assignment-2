import { Component } from '@angular/core';
import { AuthenticationService } from './AuthenticationService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client';
  constructor(public auth: AuthenticationService) {}
}
