import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard, LocalAuthGuard } from 'libs/common/src/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<any> {
    const user = req.user;
    const token = await this.authService.login(user);
    return { token };
  }

  @Post('register')
  async register(@Request() req): Promise<any> {
    const { username, password } = req.body;
    const user = await this.authService.register(username, password);
    return { user };
  }
}