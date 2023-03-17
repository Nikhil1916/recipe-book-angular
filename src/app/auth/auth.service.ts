import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {}
  signup(email, password) {
    return this.http
      .post<AuthResponseData>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDjKuVqoFja3J4_tqv0RFawd12FUgunVBw`,
        { email, password, returnSecureToken: true }
      )
      .pipe(
        catchError((errorRes) => {
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
          }
          return throwError(error);
        })
      );
  }

  logIn(email, password) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDjKuVqoFja3J4_tqv0RFawd12FUgunVBw`,
      { email, password, returnSecureToken: true }
    );
  }
}
