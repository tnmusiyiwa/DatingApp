import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private service: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.service.login(this.model).subscribe(
      next => {
        console.log('Successfully logged in');
      },
      err => {
        console.log('Could not log you in at the moment');
      }
    );
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  logout() {
    localStorage.removeItem('token');
    console.log('Successfully logout!');
  }
}
