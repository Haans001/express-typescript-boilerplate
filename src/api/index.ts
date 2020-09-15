import { Router } from 'express';
import auth from './routes/auth';
import user from './routes/user';

export default (): Router => {
  const api = Router();

  api.use('/auth', auth());
  api.use('/user', user());

  return api;
};
