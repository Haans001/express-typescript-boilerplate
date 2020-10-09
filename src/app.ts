import 'reflect-metadata';
import express from 'express';
import loaders from './loaders/index';
import config from './config';

async function main() {
  const app = express();

  // Loading database, api etc.
  await loaders(app);

  app.listen(config.port, () => {
    console.log('#####################################################');
    console.log(`Server started at port ${config.port}. Happy Hacking!`);
    console.log('#####################################################');
  });

  console.log(process.env.NODE_ENV);

  return app;
}

main();
