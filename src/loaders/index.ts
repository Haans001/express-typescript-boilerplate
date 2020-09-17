import { Application } from 'express';
import expressLoader from './express';
import mysqlLoader from './mysql';

export default async (app: Application) => {
  try {
    await mysqlLoader();

    // const entities: [{ name: string; entity: BaseEntity }] = [
    //   { name: 'user', entity: require('../entities/User').default },
    // ];

    // dependencyInjector(entities);

    expressLoader(app);
  } catch (error) {
    throw error;
  }
};
