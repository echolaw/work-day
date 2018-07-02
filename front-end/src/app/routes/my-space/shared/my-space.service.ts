import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { MySpace } from './my-space.model';

@Injectable()
export class MySpaceService {

	constructor(private http: Http) { }

	getList(): Observable<MySpace[]> {
		return this.http.get('/api/list').map(res => res.json() as MySpace[]);
	}
}