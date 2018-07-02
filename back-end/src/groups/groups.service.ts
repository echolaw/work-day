import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';
import { AddGroup } from './dto/add-group.dto';
import { ResultFormat } from '../common/utils/result-format.utils';
import { User } from '../users/user.entity';
import _ = require('lodash');
import { ModifyGroup } from './dto/modify-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group) private readonly groupRepository: Repository<Group>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  public async findAll() {
    return await this.groupRepository.find();
  }
  public async findOneById(id) {
    const resultFormat = new ResultFormat<Group>();
    const groupObj = await this.groupRepository.findOne(id);
    if (groupObj) {
      return resultFormat.succeed0({ message: '查询成功', data: groupObj });
    } else {
      return resultFormat.failLevel0({ message: '查询失败' });
    }
  }

  public async findOneByCode(code) {
    const resultFormat = new ResultFormat<Group>();
    const groupObj = await this.groupRepository.findOne({ code });
    if (groupObj) {
      return resultFormat.succeed0({ message: '查询成功', data: groupObj });
    } else {
      return resultFormat.failLevel0({ message: '查询失败' });
    }
  }

  public async addGroup(addGroup: AddGroup) {
    const resultFormat = new ResultFormat<Group>();
    try {
      const groupObj = await this.groupRepository.findOne({ code: addGroup.code });
      if (groupObj) {
        return resultFormat.failLevel0({ message: '添加失败, 用户组已存在' });
      } else {
        const newGroup = this.groupRepository.create(addGroup);
        if (await this.groupRepository.save(newGroup)) {
          return resultFormat.succeed0({ message: '保存成功' });
        }
      }
    } catch (err) {
      return resultFormat.failLevel0({ message: '添加失败, 保存时失败', err });
    }
  }
  public async modifyGroup(code, groupInfo: ModifyGroup) {
    const resultFormat = new ResultFormat<User>();
    try {
      const groupUpReust = await this.groupRepository.update({ code }, groupInfo);
      if (groupUpReust) {
        return resultFormat.succeed0({ message: '修改用户分组信息成功' });
      } else {
        return resultFormat.failLevel0({ message: '指定用户分组不存在' });
      }
    } catch (err) {
      return resultFormat.failLevel0({ message: '修改失败, 修改时失败', err });
    }
  }

  public async delGroup(groupCodes: string[]) {
    const resultFormat = new ResultFormat<Group>();
    const userList = await this.userRepository.find({ where: { groups: { $in: groupCodes } } });
    if (userList && userList.length > 0) {
      _.forEach(userList, userInfo => {
        userInfo.groups = _.pullAll(userInfo.groups, groupCodes);
        this.groupRepository.save(userInfo);
      });
    }
    const groupList = await this.groupRepository.find({ where: { code: { $in: groupCodes } } });

    await this.groupRepository.remove(groupList);

    return resultFormat.succeed0({ message: '删除成功' });
  }
}
