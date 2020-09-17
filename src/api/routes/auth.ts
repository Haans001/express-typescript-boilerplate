import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import { IUserInputDTO } from '../../interfaces/IUser';
import logger from '../../loaders/logger';
import AuthService from '../../services/auth';
import isAuth from '../middlewares/isAuth';
import signupValidationSchema from '../middlewares/signupValidationSchema';
import validateRequest from '../middlewares/validateRequest';

export default (): Router => {
  const router = Router();

  router.post(
    '/signup',
    validateRequest(signupValidationSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        logger.info('Signing up...');
        const authService = Container.get(AuthService);
        const { user, token } = await authService.SignUp(req.body as IUserInputDTO);

        return res.status(201).json({ user, token });
      } catch (error) {
        next(error);
      }
    },
  );

  router.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const authService = Container.get(AuthService);
      const { token, user } = await authService.SignIn(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      next(error);
    }
  });

  router.get('/isAuth', isAuth(false));

  return router;
};
