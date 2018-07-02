import { Module } from '@nestjs/common';
import { AppSetService } from './app-set.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppSet } from './app-set.entity';
import { AppSetsController } from './app-set.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AppSet])],
  controllers: [AppSetsController],
  providers: [AppSetService],
  exports: [AppSetService]
})
export class AppSetModule {}
