import { createConnection, Connection } from 'typeorm';
import config from '../config/index';

export default async (): Promise<Connection> =>
  await createConnection({
    type: 'mysql',
    host: 'localhost',
    username: config.database.username,
    port: parseInt(config.database.port),
  });
