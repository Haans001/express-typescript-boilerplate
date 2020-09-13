import { createConnection, Connection } from 'typeorm';
import config from '../config/index';
import { User } from '../entities/User';
import logger from './logger';

export default async (): Promise<Connection> => {
  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    username: config.database.username,
    port: parseInt(config.database.port),
    database: config.database.database,
    entities: [User],
  });

  logger.info('Database loaded.');

  return connection;
};
