import * as env from 'env-var';
import { config } from 'dotenv';

config();

export const NODE_ENV = env.get('NODE_ENV').asString();
export const PORT = env.get('PORT').required().asInt();
export const JWT_SECRET = env.get('JWT_SECRET').asString();

export const RABBITMQ_URL = env.get('RABBITMQ_URL').asString();
export const RABBITMQ_QUEUE_NAME = env.get('RABBITMQ_QUEUE_NAME').asString();
export const RABBITMQ_NOTIFICATION = env
  .get('RABBITMQ_NOTIFICATION')
  .asString();

export const DB_URL = env.get('DB_URL').asString();

export const TEST_DB_URL = env.get('TEST_DB_URL').asString();
