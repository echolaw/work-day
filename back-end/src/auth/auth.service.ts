import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ResultFormat } from '../common/utils/result-format.utils';

@Injectable()
export class AuthService {

  constructor(private readonly userService: UsersService) {}

  public async createToken(loginUserDto: LoginUserDto) {
    const resultFormat = new ResultFormat<{ expiresIn: number; accessToken: string }>();
    const userResut = await this.userService.findOneByUsername(loginUserDto.username);
    if (userResut && userResut.code === 0) {
      const userObj: User = userResut.data;
      const isValidate = await userObj.validatePassword(loginUserDto.password);
      if (isValidate) {
        const user: IJwtPayload = { identify: userObj.id + '' };
        const expiresIn = 3600;
        const accessToken = jwt.sign(user, 'secretKey', { expiresIn });
        return resultFormat.succeed0({
          message: '登录成功.',
          data: {
            expiresIn,
            accessToken
          }
        });
      } else {
        return resultFormat.failLevel0({ message: '账号或密码错误' });
      }
    }
  }

  public async validateUser(payload: IJwtPayload): Promise<any> {
    const userObj = await this.userService.findOneById(payload.identify);
    const resultFormat = new ResultFormat();
    if (userObj) {
      return resultFormat.succeed0();
    } else {
      throw new UnauthorizedException('权限验证失败');
    }
  }
}
