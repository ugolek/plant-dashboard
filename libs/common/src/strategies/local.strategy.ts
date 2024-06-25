import { Injectable, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ClientProxy } from '@nestjs/microservices';
import { AUTH } from 'apps/auth/src/constants/services';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger('LocalStrategy');
  
  constructor(@Inject(AUTH) private readonly authServiceClient: ClientProxy) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await lastValueFrom(this.authServiceClient.send('validate_user', { username, password }));

    this.logger.log('user', user);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    
    return user;
  }
}
