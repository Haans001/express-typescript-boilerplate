import { Application } from 'express';
import expressLoader from './express';
import mysqlLoader from './mysql';

export default async (app: Application) => {
  try {
    await mysqlLoader();
    console.log('DB loaded and connected');

    expressLoader(app);
  } catch (error) {
    throw error;
  }
};
