import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'libs/common/src';
import { MessagePattern } from '@nestjs/microservices';


@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId}
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
    
    async register(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if (user) {
            throw new UnauthorizedException('User already exists');
        }

        return this.usersService.create(username, password);
    }

    @MessagePattern('validate_user')
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    @MessagePattern('validate_user_by_id')
    async validateUserById(userId: string): Promise<any> {
        return this.usersService.findById(userId);
    }
}