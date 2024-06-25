import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { User, UsersService } from 'libs/common/src';
import { MessagePattern } from '@nestjs/microservices';
import { ref } from 'joi';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async login(user: User) {
    const payload = { name: user.username, sub: user._id, email: `${ user.username }@example.com` };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, { expiresIn: '20s', secret: this.configService.get<string>('AUTH_REFRESH_SECRET') })
    };
  }

  async register(username: string, password: string) {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    return this.usersService.create(username, password);
  }

  async refreshToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    this.logger.log(payload);

    try {
      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '12000s',
          secret: this.configService.get<string>('AUTH_REFRESH_SECRET'),
        }),
      };
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        this.logger.error('Refresh token has expired');
        throw new UnauthorizedException('Refresh token has expired');
      }

      this.logger.error('Invalid refresh token', error.stack);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);

    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUserById(userId: string): Promise<any> {
    return this.usersService.findById(userId);
  }
}