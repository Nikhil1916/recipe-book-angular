import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  constructor(private authS: AuthService) {}
  isLoggedIn = true;
  isLoading: boolean = false;
  error: string = null;

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
