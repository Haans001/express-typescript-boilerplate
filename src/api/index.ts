import { Router } from 'express';

export default (): Router => {
  const api = Router();

  api.get('/', (req, res) => {
    res.send('Hello World!');
  });

  return api;
};
