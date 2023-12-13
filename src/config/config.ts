import * as dotenv from 'dotenv';
dotenv.config();

export const env = {
  name: process.env.SERVICE_NAME || 'USER-SERVICE',
  port: Number(process.env.ENV_PORT) || 3000,
  environment: process.env.ENV || 'develop'
};

export const db = {
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'db_name',
}

export const eurekaClient = {
  host: process.env.EUREKA_HOST || 'localhost',
  port: Number(process.env.EUREKA_PORT) || 8761,
  registryFetchInterval: Number(process.env.EUREKA_REGISTRY_FETCHINTERVAL) || 1000,
  servicePath: process.env.EUREKA_SERVICE_PATH || '/eureka/apps',
  maxRetries: Number(process.env.EUREKA_MAX_RETRIES) || 3,
}