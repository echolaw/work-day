import { Component, OnInit } from '@angular/core';

import { DepartmentManage } from './shared/department-manage.model';
import { DepartmentManageService } from './shared/department-manage.service';

@Component({
  selector: 'app-department-manage',
  templateUrl: 'department-manage.component.html',
  providers: [DepartmentManageService],
})
export class DepartmentManageComponent implements OnInit {
  departmentManage: DepartmentManage[] = [];

  constructor(private departmentManageService: DepartmentManageService) {}

  ngOnInit() {
    // this.departmentManageService.getList().subscribe(res => {
    //   this.departmentManage = res;
    // });
  }
}
