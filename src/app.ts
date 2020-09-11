import 'reflect-metadata';
import express from 'express';
import loaders from './loaders/index';

async function main() {
  const app = express();

  await loaders();

  app.listen(5000, () => console.log('Server Started'));
}

main();
