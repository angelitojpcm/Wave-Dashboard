import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { catchError, from, of, switchMap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Auth } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private cookie: CookieService) {}

  /**
   * Function to login a user
   * @param string email
   * Example: angelitojpcmantilla22@gmail.com
   * @param string password
   */
  login(email: string, password: string) {
    let URL = URL_SERVICIOS + '/auth/login';
    return this.http.post(URL, { email: email, password: password }).pipe(
      switchMap((auth: any) => {
        return from(this.init(auth));
      }),
      catchError((error: HttpErrorResponse) => {
        // Devolver el error cuando ocurre un error
        return throwError(error);
      })
    );
  }

  /**
   * Init function to save token in cookie
   * @param auth 
   * @returns 
   */
  async init(auth: Auth) {
    // Save token in cookie
    this.cookie.set('token', auth.access_token);
    this.cookie.set('user', JSON.stringify(auth.user));

    // Return true when done
    return auth;
  }


  /**
   * Return true if user is logged
   * 
   */
  isLogged() {
    return this.cookie.check('token');
  }


  /**
   * Return user data and token from cookie
   */

  getUser() {
    return {
      user: JSON.parse(this.cookie.get('user')),
      token: this.cookie.get('token'),
    };
  }
}