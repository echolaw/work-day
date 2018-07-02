import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MyInfo } from './my-info.model';

@Injectable()
export class MyInfoService {

	constructor(private http: Http) { }

	getList(): Observable<MyInfo[]> {
		return this.http.get('/api/list').map(res => res.json() as MyInfo[]);
	}
}