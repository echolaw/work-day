import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { Login } from './login.model';
import { catchError, map, tap } from 'rxjs/operators';
import { IRes, ITokenData } from 'resFormat';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({ providedIn: 'root' })
export class LoginService {
  private loginUrl = 'api/auth/token'; // URL to web api

  constructor(private http: HttpClient) {}

  /** POST: add a new hero to the server */
  login(loginInfo: Login): Observable<IRes<ITokenData>> {
    return this.http.post<Login>(this.loginUrl, loginInfo, httpOptions).pipe(
      tap((res: any) =>
        this.log(`login result: ${JSON.stringify(res, undefined, 4)}`),
      ),
      catchError(this.handleError<Login>('login')),
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: any) {
    console.log(message);
  }
}

/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
