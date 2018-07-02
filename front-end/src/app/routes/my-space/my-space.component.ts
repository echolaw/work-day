import { Component, OnInit } from '@angular/core';

import { MySpace } from './shared/my-space.model';
import { MySpaceService } from './shared/my-space.service';

@Component({
  selector: 'app-my-space',
  templateUrl: 'my-space.component.html',
  providers: [MySpaceService],
})
export class MySpaceComponent implements OnInit {
  mySpace: MySpace[] = [];

  constructor(private mySpaceService: MySpaceService) {}

  ngOnInit() {
    this.mySpaceService.getList().subscribe(res => {
      this.mySpace = res;
    });
  }
}
