import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(@Inject('AUTH_SERVICE') private authService: ClientProxy) {}

  async onApplicationBootstrap() {
    try {
      await this.authService.connect();
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.authService.send<any, { userId: number }>(
      { cmd: 'get_user' },
      { userId: id },
    );
  }
}
