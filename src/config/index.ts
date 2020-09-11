import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  database: {
    type: 'mysql',
    host: 'localhost',
    port: process.env.DATABASE_PORT || '3306',
    username: process.env.DATABASE_USERNAME || 'test',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'test',
  },

  port: process.env.PORT || 5000,
};
