import { Controller, Get, UseGuards, Put } from '@nestjs/common';
import { AppSetService } from './app-set.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('appSet')
@UseGuards(AuthGuard('jwt'))
export class AppSetsController {
  constructor(private readonly appSetService: AppSetService) {}
  @Get()
  public async findOne() {
    return this.appSetService.findOne();
  }
}
