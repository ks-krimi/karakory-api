import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { SharedService } from './shared.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [SharedService],
  exports: [SharedService],
})
export class SharedModule {
  static register(service: string, queue: string): DynamicModule {
    const providers = [
      {
        provide: service,
        useFactory: (configService: ConfigService) => {
          const USER = configService.get<string>('RABBITMQ_USER');
          const PASSWORD = configService.get<string>('RABBITMQ_PASS');
          const HOST = configService.get<string>('RABBITMQ_HOST');
          const PORT = configService.get<number>('RABBITMQ_PORT');
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
              queueOptions: { durable: true },
              queue,
            },
          });
        },
        inject: [ConfigService],
      },
    ];
    return {
      module: SharedModule,
      providers,
      exports: providers,
    };
  }
}
