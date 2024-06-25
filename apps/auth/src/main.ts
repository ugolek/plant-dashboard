import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from 'libs/common/src/modules';
import { AUTH } from './constants/services';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  const logger = new Logger(); 

  app.connectMicroservice(rmqService.getOptions(AUTH));
  
  await app.startAllMicroservices();

  const port = 8001;
  await app.listen(port);

logger.log(`Application running on port ${port}`);
}

bootstrap();
