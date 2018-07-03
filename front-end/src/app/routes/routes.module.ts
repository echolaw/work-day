import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// My Space pages
import { MyInfoComponent } from './my-space/my-info/my-info.component';
import { MyCalendarComponent } from './my-space/my-calendar/my-calendar.component';
// privilege-center
import { UserManageComponent } from './privilege-center/user-manage/user-manage.component';
import { DepartmentManageComponent } from './privilege-center/department-manage/department-manage.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { AttendanceAccraditationComponent } from './attendance-manage/attendance-accraditation/attendance-accraditation.component';
import { AttendanceRecordComponent } from './attendance-manage/attendance-record/attendance-record.component';
import { HolidayAccraditationComponent } from './holiday-manage/holiday-accraditation/holiday-accraditation.component';
import { HolidayDefinitionComponent } from './holiday-manage/holiday-definition/holiday-definition.component';
import { HolidayRecordComponent } from './holiday-manage/holiday-record/holiday-record.component';

const COMPONENTS = [
  DashboardComponent,
  MyInfoComponent,
  MyCalendarComponent,
  // privilege-center
  UserManageComponent,
  DepartmentManageComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // attendance manage pages
  AttendanceAccraditationComponent,
  AttendanceRecordComponent,
  // holiday manage pages
  HolidayAccraditationComponent,
  HolidayDefinitionComponent,
  HolidayRecordComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component,
];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [SharedModule, RouteRoutingModule],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT],
  entryComponents: COMPONENTS_NOROUNT,
})
export class RoutesModule {}
