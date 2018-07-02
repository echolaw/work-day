import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUser } from './dto/add-user.dto';
import { ResultFormat } from '../common/utils/result-format.utils';
import * as _ from 'lodash';
import { Group } from '../groups/group.entity';
import { ModifyUser } from './dto/modify-user.dto';
import { ModifySelfPassword } from './dto/modify-self-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>
  ) {}
  public async findAll() {
    return await this.userRepository.find();
  }
  public async findOneById(id) {
    const resultFormat = new ResultFormat<User>();
    const userObj = await this.userRepository.findOne(id);
    if (userObj) {
      return resultFormat.succeed0({ message: '查询成功', data: userObj });
    } else {
      return resultFormat.failLevel0({ message: '查询失败' });
    }
  }

  public async findOneByUsername(username) {
    const resultFormat = new ResultFormat<User>();
    const userObj = await this.userRepository.findOne({ username });
    if (userObj) {
      return resultFormat.succeed0({ message: '查询成功', data: userObj });
    } else {
      return resultFormat.failLevel0({ message: '查询失败' });
    }
  }

  public async addUser(addUser: AddUser) {
    const resultFormat = new ResultFormat<User>();
    try {
      const userObj = await this.userRepository.findOne({ username: addUser.username });
      if (userObj) {
        return resultFormat.failLevel0({ message: '添加失败, 用户已存在' });
      } else {
        const newUser = this.userRepository.create(addUser);
        newUser.setPassword(addUser.password);
        if (await this.userRepository.save(newUser)) {
          return resultFormat.succeed0({ message: '保存成功' });
        }
      }
    } catch (err) {
      return resultFormat.failLevel0({ message: '添加失败, 保存时失败', err });
    }
  }

  public async modifyPassword(id: string, userInfo: ModifySelfPassword) {
    const resultFormat = new ResultFormat<User>();
    try {
      const userObj = await this.userRepository.findOne(id);
      if (userObj) {
        if (userInfo.password) {
          const verifyReust = await userObj.validatePassword(userInfo.password);
          if (!verifyReust) {
            return resultFormat.failLevel0({ message: '密码修改失败, 所验证的密码不正确' });
          }
        }
        userObj.setPassword(userInfo.newPassword);
        if (await this.userRepository.save(userObj)) {
          return resultFormat.succeed0({ message: '密码修改成功' });
        }
      } else {
        return resultFormat.succeed0({ message: '密码修改失败, 指定用户不存在' });
      }
    } catch (err) {
      return resultFormat.failLevel0({ message: '密码修改失败, 修改时失败', err });
    }
  }
  public async modifyUser(id, userInfo: ModifyUser) {
    const resultFormat = new ResultFormat<User>();
    try {
      const userUpReust = await this.userRepository.update(id, userInfo);
      if (userUpReust) {
        return resultFormat.succeed0({ message: '修改用户信息成功' });
      } else {
        return resultFormat.failLevel0({ message: '指定用户不存在' });
      }
    } catch (err) {
      return resultFormat.failLevel0({ message: '修改失败, 修改时失败', err });
    }
  }

  public async delUser(userIds: string[]) {
    const resultFormat = new ResultFormat<User>();
    await this.userRepository.delete(userIds);
    return resultFormat.succeed0({ message: '删除成功' });
  }
  public async binGroup(uid, groupCodes: string[]) {
    const resultFormat = new ResultFormat<User>();
    const groupList = await this.groupRepository.find({ where: { code: { $in: groupCodes } } });
    if (groupList && groupList.length > 0) {
      const userObj = await this.userRepository.findOne(uid);
      groupCodes = _.concat(_.map(groupList, 'code'), userObj.groups);
      groupCodes = _.uniq(groupCodes);
      userObj.groups = groupCodes;
      await this.userRepository.save(userObj);
      return resultFormat.succeed0({ message: '绑定成功' });
    } else {
      return resultFormat.failLevel0({ message: '指定的分组code不存在' });
    }
  }
  public async unbinGroup(uid, groupCodes: string[]) {
    const resultFormat = new ResultFormat<User>();
    const groupList = await this.groupRepository.find({ where: { code: { $in: groupCodes } } });
    if (groupList && groupList.length > 0) {
      const userObj = await this.userRepository.findOne(uid);
      _.pullAll(userObj.groups, _.map(groupList, 'code'));
      await this.userRepository.save(userObj);
      return resultFormat.succeed0({ message: '解绑成功' });
    } else {
      return resultFormat.failLevel0({ message: '提交的分组code不存在' });
    }
  }
}
