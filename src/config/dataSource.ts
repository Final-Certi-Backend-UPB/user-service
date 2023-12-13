import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { db } from './config';

export const dataSource: TypeOrmModuleOptions = {
  type: "mysql",
  host: db.host,
  port: db.port,
  username: db.username,
  password: db.password,
  database: db.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
