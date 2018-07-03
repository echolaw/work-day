import { Component, OnInit } from '@angular/core';

import { AttendanceAccraditation } from './shared/attendance-accraditation.model';
import { AttendanceAccraditationService } from './shared/attendance-accraditation.service';

@Component({
  selector: 'app-attendance-accraditation',
  templateUrl: 'attendance-accraditation.component.html',
  providers: [AttendanceAccraditationService],
})
export class AttendanceAccraditationComponent implements OnInit {
  attendanceAccraditation: AttendanceAccraditation[] = [];

  constructor(
    private attendanceAccraditationService: AttendanceAccraditationService,
  ) {}

  ngOnInit() {
    // this.attendanceAccraditationService.getList().subscribe(res => {
    //   this.attendanceAccraditation = res;
    // });
  }
}
