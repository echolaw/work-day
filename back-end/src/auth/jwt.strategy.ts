import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { IJwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKey'
    });
  }

  public async validate(payload: IJwtPayload, done: (e: UnauthorizedException, result: boolean) => any) {
    const userResut = await this.authService.validateUser(payload);
    if (userResut && userResut.code !== 0) {
      return done(new UnauthorizedException(), false);
    }
    done(undefined, userResut);
  }
}
