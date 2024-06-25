import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';

import { RmqModule, User, UserSchema, UsersModule } from 'libs/common/src/modules';
import { AUTH } from './constants/services';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { AuthController } from './auth.controller';
import { LocalStrategy } from '../../../libs/common/src/strategies';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_AUTH_QUEUE: Joi.string().required(),
        MONGODB_URI: Joi.string().required(),
        AUTH_SECRET: Joi.string().required(),
        AUTH_REFRESH_SECRET: Joi.string().required(),
      }),
      envFilePath: ['./apps/auth/.env'],
    }),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    RmqModule.register({ name: AUTH }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule { }