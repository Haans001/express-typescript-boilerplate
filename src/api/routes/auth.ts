import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import HttpException from '../../exceptions/HttpException';
import { IUserInputDTO } from '../../interfaces/IUser';
import AuthService from '../../services/auth';
import signupValidationSchema from '../middlewares/signupValidationSchema';
import validateRequest from '../middlewares/validateRequest';

export default (): Router => {
  const router = Router();

  router.post(
    '/signup',
    validateRequest(signupValidationSchema),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const authService = Container.get(AuthService);
        const { token, user } = await authService.SignUp(req.body as IUserInputDTO);

        res.status(201).json({ token, user });
      } catch (error) {
        next(new HttpException(500, error.message));
      }
    },
  );

  return router;
};
