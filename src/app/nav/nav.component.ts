import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;

  constructor(public service: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit() {
    this.service.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.service.login(this.model).subscribe(
      next => {
        this.alertify.success('Successfully logged in');
      },
      err => {
        this.alertify.error('Could not log you in at the moment');
      },
      () => {
        this.router.navigate(['/members']);
      }
    );
  }

  loggedIn() {
    return this.service.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.service.currentUser = null;
    this.service.decodedToken = null;
    this.alertify.message('Successfully logout!');
    this.router.navigate(['/home']);
  }
}
