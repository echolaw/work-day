import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
  getAsyncToken() {
    return localStorage.getItem('access_token');
  }
}
