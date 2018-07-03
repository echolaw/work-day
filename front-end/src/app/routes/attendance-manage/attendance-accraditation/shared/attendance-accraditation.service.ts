import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AttendanceAccraditation } from './attendance-accraditation.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AttendanceAccraditationService {
  constructor(private http: HttpClient) {}

  getList(): Observable<AttendanceAccraditation[]> {
    return this.http
      .get('/api/list')
      .map(res => res as AttendanceAccraditation[]);
  }
}
