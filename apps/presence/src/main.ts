import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';

import { SharedService } from '@app/shared';
import { PresenceModule } from './presence.module';

async function bootstrap() {
  const app = await NestFactory.create(PresenceModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);
  const PRESENCE_QUEUE = configService.get<string>('RABBITMQ_PRESENCE_QUEUE');
  app.connectMicroservice<MicroserviceOptions>(
    sharedService.getRmqOptions(PRESENCE_QUEUE),
  );
  app.startAllMicroservices();
}
bootstrap();
