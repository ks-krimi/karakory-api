import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresService } from './postgres.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        database: configService.get('POSTGRES_DB'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        autoLoadEntities: true,
        synchronize: true, // used only for development purposes
      }),
      inject: [ConfigService],
      /* useFactory: () => ({
        ...dataSourceOptions,
        autoLoadEntities: true,
      }), */
    }),
  ],
  providers: [PostgresService],
  exports: [PostgresService],
})
export class PostgresModule {}
