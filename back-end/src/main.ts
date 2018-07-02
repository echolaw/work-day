import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { User } from './users/user.entity';
import { Group } from './groups/group.entity';
import { ConnectionOptions, createConnection } from 'typeorm';
import options from '../ormconfig.json';
import { AppSet } from './app-set/app-set.entity';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidUnknownValues: true, skipMissingProperties: true }));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('/api');
  await app.listen(3001);
  Object.assign(options, { name: 'initDB' });
  createConnection(options as ConnectionOptions).then(
    async connection => {
      const user = new User();
      const group = new Group();
      const appSet = new AppSet();

      const groupRepository = connection.getRepository(Group);
      const groupCount = await groupRepository.findAndCount({ code: 'default' });
      if (groupCount[1] <= 0) {
        group.code = 'default';
        group.name = '默认分组';
        await groupRepository.save(group);
      }

      const userRepository = connection.getRepository(User);
      const userCount = await userRepository.findAndCount({ roles: ['su'] });
      if (userCount[1] <= 0) {
        user.username = 'admin';
        user.nickname = 'admin';
        user.setPassword('admin-wd');
        user.email = 'admin@wd.com';
        user.roles = ['su'];
        user.enabled = true;
        await userRepository.save(user);
      }

      const appSetRepository = connection.getRepository(AppSet);
      const appSetCount = await appSetRepository.findAndCount();
      if (appSetCount[1] <= 0) {
        appSet.name = 'Eohe企业考勤系统';
        appSet.description = '轻松打卡与统计';
        await appSetRepository.save(appSet);
      }
    },
    // tslint:disable-next-line:no-console
    error => console.log('Cannot connect: ', error)
  );
}
bootstrap();
