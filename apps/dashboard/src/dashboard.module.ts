import { Module } from '@nestjs/common';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'


import { MongooseModule } from '@nestjs/mongoose';

import { DatabaseModule, RmqModule, UsersModule } from 'libs/common/src/modules';
import { FertilizeHistory, FertilizeHistorySchema } from './schemas/fertilize-history.schema';
import { GrowHistory, GrowHistorySchema } from './schemas/grow-history.schema';
import { Neighbors, NeighborsSchema } from './schemas/neighbors.schema';
import { Plant, PlantSchema } from './schemas/plant.schema';
import { WaterHistory, WaterHistorySchema } from './schemas/water-history.schema';
import { DashboardRepository } from './dashboard.repository';
import { JwtStrategy } from '../../../libs/common/src/strategies';
import { JwtModule } from '@nestjs/jwt';
import { AUTH } from 'apps/auth/src/constants/services';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MB_AUTH_QUEUE: Joi.string().required(),
        PORT: Joi.number().required(),
        AUTH_SECRET: Joi.string().required(),
      }),
      envFilePath: ['./apps/dashboard/.env'],
    }),
    DatabaseModule,
    MongooseModule.forFeature([
      { name: Plant.name, schema: PlantSchema },
      { name: GrowHistory.name, schema: GrowHistorySchema },
      { name: Neighbors.name, schema: NeighborsSchema },
      { name: WaterHistory.name, schema: WaterHistorySchema },
      { name: FertilizeHistory.name, schema: FertilizeHistorySchema },
    ]),
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
  controllers: [DashboardController],
  providers: [DashboardService, DashboardRepository, JwtStrategy],
})
export class DashboardModule { }
