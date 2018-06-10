import { Controller, Get, Post, HttpCode, HttpStatus, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { AddUser } from './dto/add-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ResFormat } from '../common/utils/res-format.utils';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  public findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  public async addUser(@Body() addUser: AddUser) {
    const resFormat = new ResFormat();
    const addUserResult = await this.userService.addUser(addUser);
    if (addUserResult.code === 0) {
      return resFormat.succeed({ message: addUserResult.message });
    } else {
      return resFormat.failLevel0({ message: addUserResult.message });
    }
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  public async DelUser(@Body() delUser: string[]) {
    return await this.userService.delUser(delUser);
  }
}
