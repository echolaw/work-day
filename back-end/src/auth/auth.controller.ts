import { Controller, Get, UseGuards, Post, HttpCode, HttpStatus, Body, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async createToken(@Body() loginUserDto: LoginUserDto) {
    const resResult = await this.authService.createToken(loginUserDto);
    return resResult;
  }

  @Get('app-data')
  @UseGuards(AuthGuard('jwt'))
  public async getUserAppData(@Req() req) {
    const resResult = await this.authService.getUserAppData(req.user);
    return resResult;
  }
}
