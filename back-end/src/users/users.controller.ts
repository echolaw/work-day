import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Put,
  Req,
  RequestMapping,
  RequestMethod
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AddUser } from './dto/add-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResFormat } from '../common/utils/res-format.utils';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { ResultFormat } from '../common/utils/result-format.utils';
import { ModifyUser } from './dto/modify-user.dto';
import { ModifySelfUser } from './dto/modify-self-user.dto';
import { ModifyPassword } from './dto/modify-password.dto';
import { ModifySelfPassword } from './dto/modify-self-password.dto';
import { RegisterUser } from './dto/register-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  public async findAll() {
    const resFormat = new ResFormat();
    return resFormat.succeed({ data: await this.userService.findAll() });
  }

  @Get('self')
  @UseGuards(AuthGuard('jwt'))
  public findSelf(@Req() req) {
    const resFormat = new ResFormat();
    return resFormat.succeed({ data: req.user });
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  public async findOneById(@Param('id') id: string) {
    const resFormat = new ResFormat();
    const findUserResult = await this.userService.findOneById(id);
    if (findUserResult.code === 0) {
      return resFormat.succeed({ message: findUserResult.message, data: findUserResult.data.toJSON() });
    } else {
      return resFormat.failLevel0({ message: findUserResult.message });
    }
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su')
  public async addUser(@Body() addUser: AddUser) {
    const resFormat = new ResFormat();
    addUser = plainToClass(AddUser, addUser);
    const addUserResult = await this.userService.addUser(addUser);
    if (addUserResult.code === 0) {
      return resFormat.succeed({ message: addUserResult.message });
    } else {
      return resFormat.failLevel0({ message: addUserResult.message });
    }
  }

  @Post('register')
  public async registerUser(@Body() userInfo: RegisterUser) {
    const resFormat = new ResFormat();
    userInfo = plainToClass(RegisterUser, userInfo);
    const addUserResult = await this.userService.addUser(userInfo);
    if (addUserResult.code === 0) {
      return resFormat.succeed({ message: addUserResult.message });
    } else {
      return resFormat.failLevel0({ message: addUserResult.message });
    }
  }

  /**
   * 修改自己的用户信息
   */
  @Put('self')
  @UseGuards(AuthGuard('jwt'))
  public async modifySelfUser(@Req() req, @Body() userInfo: ModifySelfUser) {
    return await this.userService.modifyUser(req.user.id.toString(), userInfo);
  }

  /**
   * 修改用户自己的密码
   */
  @Put('self-password')
  @UseGuards(AuthGuard('jwt'))
  public async modifySelfPassword(@Req() req, @Body() userInfo: ModifySelfPassword) {
    return await this.userService.modifyPassword(req.user.id, userInfo);
  }

  /**
   * 修改用户的密码
   */
  @Put('password/:id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  public async modifyPassword(@Param('id') id: string, @Body() userInfo: ModifyPassword) {
    return await this.userService.modifyPassword(id, userInfo);
  }

  /**
   * 修改用户信息
   */
  @Put(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  public async modifyUser(@Param('id') id: string, @Body() userInfo: ModifyUser) {
    return await this.userService.modifyUser(id, userInfo);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su')
  public async delUser(@Req() req, @Body() userIds: string[]) {
    const resFormat = new ResFormat();
    const currentUserId = req.user.id.toString();
    if (userIds.includes(currentUserId)) {
      return resFormat.failLevel0({ message: '不能删除自身用户' });
    } else {
      return await this.userService.delUser(userIds);
    }
  }

  /**
   * 用户绑定分组-单个分组
   */
  @Post(':uid/group/:code')
  @RequestMapping({ method: RequestMethod.POST, path: ':uid/group/:code' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  public async bindGroup(@Param('uid') uid: string, @Param('code') groupCode: string) {
    return await this.userService.binGroup(uid, [groupCode]);
  }

  /**
   * 用户绑定分组-批量分组
   */
  @Post(':uid/group')
  @RequestMapping({ method: RequestMethod.POST, path: ':uid/group/:code' })
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  public async bindGroups(@Param('uid') uid: string, @Body() groupCodes: string[]) {
    const resultFormat = new ResultFormat();
    if (groupCodes && groupCodes.length > 0) {
      return await this.userService.binGroup(uid, groupCodes);
    } else {
      return resultFormat.failLevel0({ message: '提交是数据格式不正确' });
    }
  }

  @Delete(':uid/group/:code')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  /**
   * 用户解绑分组-单个分组
   */
  public async unbindGroup(@Param('uid') uid: string, @Param('code') groupCode: string) {
    return await this.userService.unbinGroup(uid, [groupCode]);
  }
  @Delete(':uid/group')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('su', 'manager')
  /**
   * 用户解绑分组-批量分组
   */
  public async unbindGroups(@Param('uid') uid: string, @Body() groupCodes: string[]) {
    const resultFormat = new ResultFormat();
    if (groupCodes && groupCodes.length > 0) {
      return await this.userService.unbinGroup(uid, groupCodes);
    } else {
      return resultFormat.failLevel0({ message: '提交是数据格式不正确' });
    }
  }
}
