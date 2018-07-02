import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';

import { MyCalendar } from './shared/my-calendar.model';
import { MyCalendarService } from './shared/my-calendar.service';

@Component({
  selector: 'app-my-calendar',
  templateUrl: 'my-calendar.component.html',
  // providers: [MyCalendarService],
})
export class MyCalendarComponent implements OnInit {
  myCalendar: MyCalendar[] = [];

  constructor(
    private myCalendarService: MyCalendarService,
    private http: _HttpClient,
  ) {}

  ngOnInit() {
    // this.myCalendarService.getList().subscribe(res => {
    //   this.myCalendar = res;
    // });
  }
}
