import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSet } from './app-set.entity';
import { ResultFormat } from '../common/utils/result-format.utils';

@Injectable()
export class AppSetService {
  constructor(@InjectRepository(AppSet) private readonly appSetRepository: Repository<AppSet>) {}

  public async findOne() {
    const resultFormat = new ResultFormat<AppSet>();
    const appSetObj = await this.appSetRepository.findOne();
    if (appSetObj) {
      return resultFormat.succeed0({ message: '查询成功', data: appSetObj });
    } else {
      return resultFormat.failLevel0({ message: '查询失败' });
    }
  }
}
