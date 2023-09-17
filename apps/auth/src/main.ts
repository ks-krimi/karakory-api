import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AuthModule } from './auth.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const configService = app.get(ConfigService);

  const USER = configService.get<string>('RABBITMQ_USER');
  const PASSWORD = configService.get<string>('RABBITMQ_PASS');
  const HOST = configService.get<string>('RABBITMQ_HOST');
  const PORT = configService.get<number>('RABBITMQ_PORT');
  const AUTH_QUEUE = configService.get<string>('RABBITMQ_AUTH_QUEUE');

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
      queue: AUTH_QUEUE,
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
  app.startAllMicroservices();
  app.listen(3001);
}
bootstrap();
