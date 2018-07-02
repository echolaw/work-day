import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { DepartmentManage } from './department-manage.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DepartmentManageService {
  constructor(private http: HttpClient) {}

  getList(): Observable<DepartmentManage[]> {
    return this.http.get('/api/list').map(res => res as DepartmentManage[]);
  }
}
