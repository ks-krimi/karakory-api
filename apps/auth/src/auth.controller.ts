import { Controller, Get } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

import { SharedService } from '@app/shared';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly sharedService: SharedService,
  ) {}

  @Get()
  getHello(): string {
    return this.authService.getHello();
  }

  @MessagePattern({ cmd: 'get_user' })
  async getUser(
    @Payload() data: { userId: number },
    @Ctx() context: RmqContext,
  ) {
    this.sharedService.acknowledge(context);
    return this.authService.getUser(data.userId);
  }

  @MessagePattern({ cmd: 'get_users' })
  async getUsers(@Ctx() context: RmqContext) {
    this.sharedService.acknowledge(context);
    return this.authService.getUsers();
  }

  @MessagePattern({ cmd: 'create_user' })
  async createUser(
    @Payload() data: { email: string; password: string },
    @Ctx() context: RmqContext,
  ) {
    this.sharedService.acknowledge(context);
    return this.authService.createUser(data);
  }
}
