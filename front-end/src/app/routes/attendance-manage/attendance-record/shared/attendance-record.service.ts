import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AttendanceRecord } from './attendance-record.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AttendanceRecordService {
  constructor(private http: HttpClient) {}

  getList(): Observable<AttendanceRecord[]> {
    return this.http.get('/api/list').map(res => res as AttendanceRecord[]);
  }
}
