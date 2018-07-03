import { Component, OnInit } from '@angular/core';

import { AttendanceRecord } from './shared/attendance-record.model';
import { AttendanceRecordService } from './shared/attendance-record.service';

@Component({
  selector: 'app-attendance-record',
  templateUrl: 'attendance-record.component.html',
  providers: [AttendanceRecordService],
})
export class AttendanceRecordComponent implements OnInit {
  attendanceRecord: AttendanceRecord[] = [];

  constructor(private attendanceRecordService: AttendanceRecordService) {}

  ngOnInit() {
    // this.attendanceRecordService.getList().subscribe(res => {
    //   this.attendanceRecord = res;
    // });
  }
}
