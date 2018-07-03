import { Component, OnInit } from '@angular/core';

import { HolidayRecord } from './shared/holiday-record.model';
import { HolidayRecordService } from './shared/holiday-record.service';

@Component({
  selector: 'app-holiday-record',
  templateUrl: 'holiday-record.component.html',
  providers: [HolidayRecordService],
})
export class HolidayRecordComponent implements OnInit {
  holidayRecord: HolidayRecord[] = [];

  constructor(private holidayRecordService: HolidayRecordService) {}

  ngOnInit() {
    // this.holidayRecordService.getList().subscribe(res => {
    //   this.holidayRecord = res;
    // });
  }
}
