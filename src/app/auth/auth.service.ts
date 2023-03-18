import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { userModel } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  refreshToken: string;
  email: string;
  idToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<userModel>(null);
  constructor(private http: HttpClient, private router: Router) {}
  signup(email, password) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjKuVqoFja3J4_tqv0RFawd12FUgunVBw`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resD) => {
          this.handleAuthentication(
            resD.email,
            resD.localId,
            resD.idToken,
            resD.expiresIn
          );
        })
      );
  }

  logIn(email, password) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjKuVqoFja3J4_tqv0RFawd12FUgunVBw`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError(this.handleError),
        tap((resD) => {
          this.handleAuthentication(
            resD.email,
            resD.localId,
            resD.idToken,
            resD.expiresIn
          );
        })
      );
  }

  onLogout() {
    this.user.next(null);
    this.router.navigate(['auth']);
  }

  private handleError(errorRes) {
    let error = 'An error occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'email already exists';
        break;
      case 'OPERATION_NOT_ALLOWED':
        error = 'operation not allowed to the user';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        error = 'attemps limit has passed';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'email not found';
        break;
      case 'INVALID_PASSWORD':
        error = 'password is invalid';
        break;
      case 'USER_DISABLED':
        error = 'user is disabled';
        break;
    }
    return throwError(error);
  }

  private handleAuthentication(email, userId, token, expiresIn) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new userModel(email, userId, token, expirationDate);
    this.user.next(user);
  }
}
