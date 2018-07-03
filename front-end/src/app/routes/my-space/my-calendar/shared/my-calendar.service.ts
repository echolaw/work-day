import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MyCalendar } from './my-calendar.model';

@Injectable({ providedIn: 'root' })
export class MyCalendarService {
  constructor(private http: HttpClient) {}

  getList(): Observable<MyCalendar[]> {
    return this.http.get('/api/list').map(res => res as MyCalendar[]);
  }
}
