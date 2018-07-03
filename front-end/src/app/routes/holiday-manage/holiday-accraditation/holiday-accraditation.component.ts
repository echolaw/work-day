import { Component, OnInit } from '@angular/core';

import { HolidayAccraditation } from './shared/holiday-accraditation.model';
import { HolidayAccraditationService } from './shared/holiday-accraditation.service';

@Component({
  selector: 'app-holiday-accraditation',
  templateUrl: 'holiday-accraditation.component.html',
  providers: [HolidayAccraditationService],
})
export class HolidayAccraditationComponent implements OnInit {
  holidayAccraditation: HolidayAccraditation[] = [];

  constructor(
    private holidayAccraditationService: HolidayAccraditationService,
  ) {}

  ngOnInit() {
    // this.holidayAccraditationService.getList().subscribe(res => {
    //   this.holidayAccraditation = res;
    // });
  }
}
