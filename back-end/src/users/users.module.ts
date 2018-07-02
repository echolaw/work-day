import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Group } from '../groups/group.entity';
import { UsersController } from './users.controller';
import { Base } from '../common/entity/base.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Group, Base])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
