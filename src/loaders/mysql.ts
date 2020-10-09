import Container from 'typedi';
import { createConnection, Connection, useContainer } from 'typeorm';
import config from '../config/index';
import { User } from '../entities/User';
import logger from './logger';

export default async (): Promise<Connection> => {
  useContainer(Container);

  const database = (process.env.NODE_ENV = 'development' ? config.database.database : 'test');

  const connection = await createConnection({
    type: 'mysql',
    host: 'localhost',
    username: config.database.username,
    port: parseInt(config.database.port),
    database: database,
    entities: [User],
  });

  connection.synchronize();

  logger.info('Database loaded.');

  return connection;
};
