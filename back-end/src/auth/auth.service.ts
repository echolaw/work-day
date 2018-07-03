import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { IJwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from '../users/users.service';
import { AppSetService } from '../app-set/app-set.service';
import { User } from '../users/user.entity';
import { ResultFormat } from '../common/utils/result-format.utils';
import { ITokenData } from 'resFormat';
import { IResult } from 'resultFormat';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService, private readonly appSetService: AppSetService) {}

  public async createToken(loginUserDto: LoginUserDto) {
    const resultFormat = new ResultFormat<ITokenData>();
    const userResut = await this.userService.findOneByUsername(loginUserDto.username);
    if (userResut && userResut.code === 0) {
      const userObj: User = userResut.data;
      if (userObj.enabled) {
        const isValidate = await userObj.validatePassword(loginUserDto.password);
        if (isValidate) {
          const user: IJwtPayload = { identify: userObj.id + '' };
          const expiresIn = 86400;
          const refreshExpiresIn = 604800;
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
          return resultFormat.failLevel0({ message: '账号不存在或密码错误' });
        }
      } else {
        return resultFormat.failLevel0({ message: '账号未激活, 请先联系管理员激活账号' });
      }
    } else {
      return resultFormat.failLevel0({ message: '账号不存在或密码错误' });
    }
  }

  public async validateUser(payload: IJwtPayload): Promise<IResult> {
    const userResult = await this.userService.findOneById(payload.identify);
    const resultFormat = new ResultFormat();
    if (userResult && userResult.code === 0) {
      return resultFormat.succeed0({ data: userResult.data });
    } else {
      return resultFormat.failLevel0({ message: '权限验证失败' });
    }
  }

  /**
   * 获取当前用户可用的app信息, 如权限等
   */
  public async getUserAppData(userInfo) {
    const resultFormat = new ResultFormat();
    const appDate = {} as { app; user; menu };
    const appResult = await this.appSetService.findOne();
    appDate.app = appResult.data;
    appDate.user = { name: userInfo.nickname, avatar: userInfo.avatar, email: userInfo.email };
    appDate.menu = [
      {
        text: '主导航',
        i18n: 'main_navigation',
        group: true,
        hideInBreadcrumb: true,
        children: [
          {
            text: '我的空间',
            i18n: 'my_space',
            icon: 'anticon anticon-home',
            children: [
              {
                text: '我的信息',
                link: '/my-info',
                i18n: 'my_info'
              },
              {
                text: '我的日历',
                link: '/my-calendar',
                i18n: 'my_calendar'
              }
            ]
          },
          {
            text: '权限中心',
            i18n: 'privilege_center',
            icon: 'anticon anticon-idcard',
            children: [
              {
                text: '用户管理',
                link: '/user-manage',
                i18n: 'user_manage',
                icon: 'icon-user'
              },
              {
                text: '部门管理',
                link: '/department-manage',
                i18n: 'department_manage',
                icon: 'icon-usergroup-add'
              }
            ]
          },
          {
            text: '考勤管理',
            i18n: 'attendance_manage',
            icon: 'anticon anticon-calendar',
            children: [
              {
                text: '考勤审批',
                link: '/attendance-accraditation',
                i18n: 'attendance_accraditation',
                icon: 'icon-user'
              },
              {
                text: '考勤记录',
                link: '/attendance-record',
                i18n: 'attendance_record',
                icon: 'icon-usergroup-add'
              }
            ]
          },
          {
            text: '请假管理',
            i18n: 'holiday_manage',
            icon: 'anticon anticon-tags-o',
            children: [
              {
                text: '请假审批',
                link: '/holiday-accraditation',
                i18n: 'holiday_accraditation',
                icon: 'icon-user'
              },
              {
                text: '请假记录',
                link: '/holiday-record',
                i18n: 'holiday_record',
                icon: 'icon-usergroup-add'
              },
              {
                text: '请假定义',
                link: '/holiday-definition',
                i18n: 'holiday_definition',
                icon: 'icon-usergroup-add'
              }
            ]
          }
        ]
      }
    ];
    return resultFormat.succeed0({ data: appDate });
  }
}
