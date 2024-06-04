import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { RmqService } from 'libs/common/src/modules';
import { AUTH } from './constants/services';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);

  app.connectMicroservice(rmqService.getOptions(AUTH));
  
  await app.startAllMicroservices();

  await app.listen(3001);
}
bootstrap();
