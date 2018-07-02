import { Controller, Get, Post, Body, Delete, Param, UseGuards, Put } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './group.entity';
import { AddGroup } from './dto/add-group.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResFormat } from '../common/utils/res-format.utils';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import { ModifyGroup } from './dto/modify-group.dto';
import { IRes } from 'resFormat';

@Controller('group')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class GroupsController {
  constructor(private readonly groupService: GroupsService) {}
  @Get()
  @Roles('su', 'manager')
  public async findAll() {
    const resFormat = new ResFormat();
    return resFormat.succeed({ data: await this.groupService.findAll() });
  }

  @Get(':code')
  @Roles('su', 'manager')
  public async findOneByCode(@Param('code') code: string) {
    const resFormat = new ResFormat();
    const findGroupResult = await this.groupService.findOneByCode(code);
    if (findGroupResult.code === 0) {
      return resFormat.succeed({ message: findGroupResult.message, data: findGroupResult.data.toJSON() });
    } else {
      return resFormat.failLevel0({ message: findGroupResult.message });
    }
  }

  @Post()
  @Roles('su')
  public async addGroup(@Body() addGroup: AddGroup) {
    const resFormat = new ResFormat();
    const addGroupResult = await this.groupService.addGroup(addGroup);
    if (addGroupResult.code === 0) {
      return resFormat.succeed({ message: addGroupResult.message });
    } else {
      return resFormat.failLevel0({ message: addGroupResult.message });
    }
  }

  @Put(':code')
  @Roles('su', 'manager')
  public async modifyGroup(@Param('code') code: string, @Body() groupInfo: ModifyGroup) {
    const resFormat = new ResFormat();
    const addGroupResult = await this.groupService.modifyGroup(code, groupInfo);
    if (addGroupResult.code === 0) {
      return resFormat.succeed({ message: addGroupResult.message });
    } else {
      return resFormat.failLevel0({ message: addGroupResult.message });
    }
  }

  @Delete()
  @Roles('su')
  public async DelGroup(@Body() groupCodes: string[]) {
    const resFormat = new ResFormat();
    if (groupCodes.includes('default')) {
      return resFormat.failLevel0({ message: '不能删除默认分组' });
    } else {
      return await this.groupService.delGroup(groupCodes);
    }
  }
}
