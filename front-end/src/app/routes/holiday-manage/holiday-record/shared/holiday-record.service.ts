import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HolidayRecord } from './holiday-record.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayRecordService {
  constructor(private http: HttpClient) {}

  getList(): Observable<HolidayRecord[]> {
    return this.http.get('/api/list').map(res => res as HolidayRecord[]);
  }
}
