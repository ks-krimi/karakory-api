import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { SharedService } from '@app/shared';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  const AUTH_QUEUE = configService.get<string>('RABBITMQ_AUTH_QUEUE');
  app.connectMicroservice<MicroserviceOptions>(
    sharedService.getRmqOptions(AUTH_QUEUE),
  );
  app.startAllMicroservices();
}
bootstrap();
