import { Controller, Get, UseGuards, Post, HttpCode, HttpStatus, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  @HttpCode(HttpStatus.OK)
  public async createToken(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.createToken(loginUserDto);
  }
}
