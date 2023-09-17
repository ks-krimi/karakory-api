import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    /* ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
      },
    ]), */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*
     * instead of hard coding the connection to the microservice,
     * we can use the ConfigService to get the values from the .env file
     */
    {
      provide: 'AUTH_SERVICE',
      useFactory: (configService: ConfigService) => {
        const USER = configService.get<string>('RABBITMQ_USER');
        const PASSWORD = configService.get<string>('RABBITMQ_PASS');
        const HOST = configService.get<string>('RABBITMQ_HOST');
        const PORT = configService.get<number>('RABBITMQ_PORT');
        const AUTH_QUEUE = configService.get<string>('RABBITMQ_AUTH_QUEUE');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
            queue: AUTH_QUEUE,
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
