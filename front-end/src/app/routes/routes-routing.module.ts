import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutFullScreenComponent } from '../layout/fullscreen/fullscreen.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// My Space pages
import { MyInfoComponent } from './my-info/my-info.component';
import { MyCalendarComponent } from './my-calendar/my-calendar.component';
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
// privilege center pages
import { UserManageComponent } from './privilege-center/user-manage/user-manage.component';
import { DepartmentManageComponent } from './privilege-center/department-manage/department-manage.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      { path: '', redirectTo: 'my-info', pathMatch: 'full' },
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      //   data: { title: '仪表盘' },
      // },
      {
        path: 'my-info',
        component: MyInfoComponent,
        data: { title: '我的信息' },
      },
      {
        path: 'my-calendar',
        component: MyCalendarComponent,
        data: { title: '我的日历' },
      },
      {
        path: 'user-manage',
        component: UserManageComponent,
        data: { title: '用户管理' },
      },
      {
        path: 'department-manage',
        component: DepartmentManageComponent,
        data: { title: '部门管理' },
      },
      // 业务子模块
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
    ],
  },
  // 全屏布局
  {
    path: 'fullscreen',
    component: LayoutFullScreenComponent,
    children: [],
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      {
        path: 'register',
        component: UserRegisterComponent,
        data: { title: '注册' },
      },
      {
        path: 'register-result',
        component: UserRegisterResultComponent,
        data: { title: '注册结果' },
      },
    ],
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule],
})
export class RouteRoutingModule {}
