import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SharedModule } from '@app/shared';
import { PresenceController } from './presence.controller';
import { PresenceService } from './presence.service';

@Module({
  imports: [ConfigModule.forRoot(), SharedModule],
  controllers: [PresenceController],
  providers: [PresenceService],
})
export class PresenceModule {}
