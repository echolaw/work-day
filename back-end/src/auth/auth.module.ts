import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { AppSetModule } from '../app-set/app-set.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [UsersModule, AppSetModule],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
