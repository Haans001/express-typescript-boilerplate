import { Router } from 'express';
import auth from './routes/auth';

export default (): Router => {
  const api = Router();

  api.use(auth());

  return api;
};
