import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { GroupsModule } from './groups/groups.module';
import { AppSetModule } from './app-set/app-set.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AuthModule, UsersModule, GroupsModule, AppSetModule],
  providers: []
})
export class ApplicationModule {}
