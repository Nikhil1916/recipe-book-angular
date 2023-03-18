import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(private authS: AuthService, private router: Router) {}
  isLoggedIn = true;
  isLoading: boolean = false;
  error: string = null;
  ngOnInit(): void {
    this.authS.user.subscribe((res) => {});
  }
  onSwitchMode() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;
    const email = form.value.email;
    const password = form.value.password;
    if (!this.isLoggedIn) {
      authObs = this.authS.signup(email, password);
    } else {
      authObs = this.authS.logIn(email, password);
    }
    authObs.subscribe({
      next: (res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        console.log(error);
        this.error = error;
        this.isLoading = false;
      },
    });
    form.reset();
  }
}
