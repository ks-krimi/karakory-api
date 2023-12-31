import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class SharedService {
  constructor(private readonly configService: ConfigService) {}
  getRmqOptions(queue: string): RmqOptions {
    const USER = this.configService.get<string>('RABBITMQ_USER');
    const PASSWORD = this.configService.get<string>('RABBITMQ_PASS');
    const HOST = this.configService.get<string>('RABBITMQ_HOST');
    const PORT = this.configService.get<number>('RABBITMQ_PORT');
    return {
      transport: Transport.RMQ,
      options: {
        urls: [`amqp://${USER}:${PASSWORD}@${HOST}:${PORT}`],
        queue: queue,
        noAck: false,
        queueOptions: { durable: true },
      },
    };
  }
  acknowledge(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }
}
