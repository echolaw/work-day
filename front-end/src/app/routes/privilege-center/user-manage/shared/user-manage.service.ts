import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserManage } from './user-manage.model';
import { HttpClient } from '@angular/common/http';
import { IRes } from 'resFormat';

@Injectable()
export class UserManageService {
  constructor(private http: HttpClient) {}

  getList(): Observable<IRes<UserManage[]>> {
    return this.http.get('api/user').map(res => res as IRes<UserManage[]>);
  }
}
