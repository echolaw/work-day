import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { ResultFormat } from '../common/utils/result-format.utils';
import { ITokenData } from 'resFormat';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async createToken(loginUserDto: LoginUserDto) {
    const resultFormat = new ResultFormat<ITokenData>();
    const userResut = await this.userService.findOneByUsername(loginUserDto.username);
    if (userResut && userResut.code === 0) {
      const userObj: User = userResut.data;
      const isValidate = await userObj.validatePassword(loginUserDto.password);
      if (isValidate) {
        const user: IJwtPayload = { identify: userObj.id + '' };
        const expiresIn = 3600;
        const refreshExpiresIn = 86400;
        const accessToken = jwt.sign(Object.assign({ type: 'access' }, user), 'secretKey', {
          expiresIn,
          algorithm: 'HS512'
        });
        const refreshToken = jwt.sign(Object.assign({ type: 'refresh' }, user), 'secretKey', {
          expiresIn: refreshExpiresIn,
          algorithm: 'HS512'
        });
        return resultFormat.succeed0({
          message: '登录成功.',
          data: {
            accessToken,
            refreshToken
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
