import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { UserManage, ModifyPassword, ModifyUser } from './user-manage.model';
import { HttpClient } from '@angular/common/http';
import { IRes } from 'resFormat';

@Injectable()
export class UserManageService {
  baseApi = 'api/user';

  constructor(private http: HttpClient) {}

  getList(): Observable<IRes<UserManage[]>> {
    return this.http.get(this.baseApi).map(res => res as IRes<UserManage[]>);
  }

  addUser(userInfo: UserManage): Observable<IRes> {
    return this.http.post(this.baseApi, userInfo).map(res => res as IRes);
  }
  modifyUser(userInfo: ModifyUser): Observable<IRes> {
    return this.http.put(this.baseApi, userInfo).map(res => res as IRes);
  }
  modifyPassword(id: string, userInfo: ModifyPassword): Observable<IRes> {
    return this.http
      .put(`${this.baseApi}/password/${id}`, userInfo)
      .map(res => res as IRes);
  }
  delUser(userInfo: string[]) {
    return this.http
      .request('delete', this.baseApi, { body: userInfo })
      .map(res => res as IRes);
  }
}
