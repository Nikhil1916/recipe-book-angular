import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { userModel } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
  tokenExpirationTimer: any;
  API_KEY;
  constructor(private http: HttpClient, private router: Router) {
    this.API_KEY = environment.fireBaseAPIKey;
  }
  signup(email, password) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`,
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
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`,
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
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    localStorage.clear();
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
    this.autoLogOut(+expiresIn * 1000);
    const user = new userModel(email, userId, token, expirationDate);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const user: { email; id; _token; _tokenExpirationDate } = JSON.parse(
      localStorage.getItem('userData')
    );
    if (!user) {
      return;
    }
    const newUser = new userModel(
      user.email,
      user.id,
      user._token,
      user._tokenExpirationDate
    );
    newUser['_tokenExpirationDate'] = new Date(user['_tokenExpirationDate']);
    if (newUser.token) {
      const remainTime =
        new Date(newUser['_tokenExpirationDate']).getTime() -
        new Date().getTime();
      this.autoLogOut(remainTime);
      this.user.next(newUser);
    }
  }

  autoLogOut(expiresIn) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.onLogout();
    }, expiresIn);
  }
}
