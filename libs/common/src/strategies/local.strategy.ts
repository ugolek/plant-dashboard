import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH } from 'apps/auth/src/constants/services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(AUTH) private readonly authServiceClient: ClientProxy) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authServiceClient.send('validate_user', { username, password });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
