import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard, RefreshJWTGuard } from 'libs/common/src/guards';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const user = req.user;
    const tokens = await this.authService.login(user);

    return tokens;
  }

  @Post('register')
  async register(@Request() req): Promise<any> {
    const { username, password } = req.body;
    const user = await this.authService.register(username, password);
    return { user };
  }

  @Post('refresh')
  @UseGuards(RefreshJWTGuard)
  async refresh(@Request() req): Promise<any> {
    const user = req.user;
    const tokens = await this.authService.refreshToken(user);
    return tokens;
  }

  @MessagePattern('validate_user')
  async handleValidateUser(@Payload() data: { username: string, password: string }): Promise<any> {
    return this.authService.validateUser(data.username, data.password);
  }

  @MessagePattern('validate_user_by_id')
  async handleValidateUserById(@Payload() userId: string): Promise<any> {
    return this.authService.validateUserById(userId);
  }
}