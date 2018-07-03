import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { HolidayDefinition } from './holiday-definition.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HolidayDefinitionService {
  constructor(private http: HttpClient) {}

  getList(): Observable<HolidayDefinition[]> {
    return this.http.get('/api/list').map(res => res as HolidayDefinition[]);
  }
}
