import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupsController } from './groups.controller';
import { User } from '../users/user.entity';
import { Base } from '../common/entity/base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Base])],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService]
})
export class GroupsModule {}
