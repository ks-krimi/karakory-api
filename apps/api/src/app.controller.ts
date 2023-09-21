import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller('users')
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: ClientProxy,
    @Inject('PRESENCE_SERVICE') private presenceService: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    try {
      await this.authService.connect();
    } catch (error) {
      console.log(error);
    }
  }

  @Get('presence')
  async getPresence() {
    return this.presenceService.send({ cmd: 'get_presence' }, {});
  }

  @Get(':id')
  async getUser(@Param('id') id: number) {
    return this.authService.send<any, { userId: number }>(
      { cmd: 'get_user' },
      { userId: id },
    );
  }

  @Get()
  async getUsers() {
    return this.authService.send({ cmd: 'get_users' }, {});
  }

  @Post()
  async createUser(@Body() userDTO: { email: string; password: string }) {
    return this.authService.send<any, { password: string; email: string }>(
      { cmd: 'create_user' },
      { ...userDTO },
    );
  }
}
