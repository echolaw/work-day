import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import * as _ from 'lodash';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';
import { IRes } from 'resFormat';
import { UserManageService } from './shared/user-manage.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  providers: [UserManageService],
})
export class UserManageComponent implements OnInit {
  q: any = {
    pi: 1,
    ps: 10,
    sorter: '',
    status: null,
    statusList: [],
  };
  data: any[] = [];
  loading = false;
  status = [
    {
      index: false,
      text: '禁用',
      value: false,
      type: 'default',
      checked: false,
    },
    {
      index: true,
      text: '启用',
      value: false,
      type: 'success',
      checked: false,
    },
  ];
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '', index: 'id', type: 'checkbox' },
    { title: '用户名称', index: 'username' },
    { title: '员工姓名', index: 'nickname' },
    { title: '电子邮箱', index: 'email' },
    { title: '联系电话', index: 'mobile' },
    { title: '所属角色', index: 'roles' },
    { title: '所属部门', index: 'groups' },
    {
      title: '状态',
      index: 'enabled',
      render: 'status',
      filters: this.status,
      filter: () => true,
    },
    {
      title: '创建时间',
      index: 'createdAt',
      type: 'date',
      sorter: (a: any, b: any) => a.createdAt - b.createdAt,
    },
    {
      title: '操作',
      buttons: [
        {
          text: '编辑',
          click: (item: any) => this.msg.success(`配置${item.id}`),
        },
        {
          text: '启用/禁用',
          click: (item: any) => this.msg.success(`启用${item.id}`),
        },
        {
          text: '删除',
          click: (item: any) => this.msg.success(`删除${item.id}`),
        },
      ],
    },
    { title: '备注', index: 'description' },
  ];
  selectedRows: SimpleTableData[] = [];
  description = '';
  total = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private userManageService: UserManageService,
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true;
    this.q.statusList = this.status
      .filter(w => w.checked)
      .map(item => item.index);
    if (this.q.status !== null && this.q.status > -1)
      this.q.statusList.push(this.q.status);

    this.userManageService
      .getList()
      .pipe(
        map((res: IRes<any[]>) => {
          if (res && res.code === 0) {
            return res.data.map(i => {
              const statusItem = _.find<any>(this.status, { index: i.enabled });
              i.statusText = statusItem.text;
              i.statusType = statusItem.type;
              return i;
            });
          } else {
            this.msg.error(res.message);
            return [];
          }
        }),
        tap(() => (this.loading = false)),
      )
      .subscribe(data => (this.data = data));
  }

  checkboxChange(list: SimpleTableData[]) {
    this.selectedRows = list;
    this.total = this.data.length;
  }

  remove() {
    this.http
      .delete('/rule', { nos: this.selectedRows.map(i => i.no).join(',') })
      .subscribe(() => {
        this.getData();
        this.st.clearCheck();
      });
  }

  approval() {
    this.msg.success(`审批了 ${this.selectedRows.length} 笔`);
  }

  add(tpl: TemplateRef<{}>) {
    this.modalSrv.create({
      nzTitle: '新建规则',
      nzContent: tpl,
      nzOnOk: () => {
        this.loading = true;
        this.http
          .post('/rule', { description: this.description })
          .subscribe(() => {
            this.getData();
          });
      },
    });
  }

  reset(ls: any[]) {
    for (const item of ls) item.value = false;
    this.getData();
  }
}
