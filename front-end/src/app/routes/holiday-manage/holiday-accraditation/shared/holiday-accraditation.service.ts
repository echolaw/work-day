import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HolidayAccraditation } from './holiday-accraditation.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayAccraditationService {
  constructor(private http: HttpClient) {}

  getList(): Observable<HolidayAccraditation[]> {
    return this.http.get('/api/list').map(res => res as HolidayAccraditation[]);
  }
}
