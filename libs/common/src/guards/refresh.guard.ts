import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshJWTGuard extends AuthGuard('jwt') {
    constructor(private jwtService: JwtService, private configService: ConfigService) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('AUTH_REFRESH_SECRET') });
            
            request['user'] = payload;
        } catch (error) {
            throw new UnauthorizedException();
        }

        return true;
    }

    private extractTokenFromHeader(request: Request) {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return null;
        }
        const parts = authHeader.split(' ');
        if (parts.length !== 2) { 
            return null;
        }
        const [type, token] = parts;


        if (/^Refresh$/i.test(type)) {
            return token;
        }

        return null;
    }
}
