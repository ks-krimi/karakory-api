import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule } from '@app/shared';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SharedModule.register('AUTH_SERVICE', process.env.RABBITMQ_AUTH_QUEUE),
    SharedModule.register(
      'PRESENCE_SERVICE',
      process.env.RABBITMQ_PRESENCE_QUEUE,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
