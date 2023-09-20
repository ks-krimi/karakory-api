import { DataSource, DataSourceOptions } from 'typeorm';

import { User } from '../user.entity';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  entities: [User],
  migrations: ['dist/apps/auth/database/migrations/*.js'],
};

export const dataSource = new DataSource(dataSourceOptions);
