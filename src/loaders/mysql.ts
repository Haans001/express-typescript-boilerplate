import { createConnection, Connection, ConnectionOptions, DatabaseType } from 'typeorm';
import config from '../config/index';

const options = {
  type: config.database.type as DatabaseType,
  host: config.database.host,
  database: config.database.database,
  username: config.database.username,
  password: config.database.password,
};

export default async (): Promise<Connection> => await createConnection(options);
