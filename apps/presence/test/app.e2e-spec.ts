import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { PresenceModule } from './../src/presence.module';

describe('PresenceController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [PresenceModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
});
