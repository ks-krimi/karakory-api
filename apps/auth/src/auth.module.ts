import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresModule, SharedModule } from '@app/shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    SharedModule,
    PostgresModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
