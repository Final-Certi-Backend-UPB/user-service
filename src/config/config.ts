import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  name: process.env.SERVICE_NAME || 'USER-SERVICE',
  host: process.env.ENV_HOST || 'localhost',
  port: Number(process.env.ENV_PORT) || 3200,
  environment: process.env.ENV || 'develop'
};

export const db = {
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'user_db',
}

export const eureka = {
  host: process.env.EUREKA_HOST || 'localhost',
  port: Number(process.env.EUREKA_PORT) || 8761,
}