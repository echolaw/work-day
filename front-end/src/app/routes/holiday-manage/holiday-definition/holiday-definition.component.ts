import { Component, OnInit } from '@angular/core';

import { HolidayDefinition } from './shared/holiday-definition.model';
import { HolidayDefinitionService } from './shared/holiday-definition.service';

@Component({
  selector: 'app-holiday-definition',
  templateUrl: 'holiday-definition.component.html',
  providers: [HolidayDefinitionService],
})
export class HolidayDefinitionComponent implements OnInit {
  holidayDefinition: HolidayDefinition[] = [];

  constructor(private holidayDefinitionService: HolidayDefinitionService) {}

  ngOnInit() {
    // this.holidayDefinitionService.getList().subscribe(res => {
    //   this.holidayDefinition = res;
    // });
  }
}
