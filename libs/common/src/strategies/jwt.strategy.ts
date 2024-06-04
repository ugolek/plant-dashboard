import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH } from 'apps/auth/src/constants/services';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @Inject(AUTH) private readonly authServiceClient: ClientProxy
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('AUTH_SECRET'),
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authServiceClient.send('validate_user_by_id', payload.sub);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
