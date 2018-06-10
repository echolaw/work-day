import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { AddUser } from './dto/add-user.dto';
import { ResultFormat } from '../common/utils/result-format.utils';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}
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

  public async delUser(delUser: string[]) {
    const resultFormat = new ResultFormat<User>();
    await this.userRepository.delete(delUser);
    return resultFormat.succeed0({ message: '删除成功' });
  }
}
