import 'reflect-metadata';
import express from 'express';

function main() {
  const app = express();

  app.listen(5000, () => console.log('Server Started'));
}

main();
