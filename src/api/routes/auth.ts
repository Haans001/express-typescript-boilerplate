import { Router } from 'express';
import Container from 'typedi';
import HttpException from '../../exceptions/HttpException';
import { IUserInputDTO } from '../../interfaces/IUser';
import AuthService from '../../services/auth';
import signupValidationSchema from '../middlewares/signupValidationSchema';
import validateRequest from '../middlewares/validateRequest';

export default (): Router => {
  const router = Router();

  router.post('/signup', validateRequest(signupValidationSchema), (req, res, next) => {
    const authService = Container.get(AuthService);

    const user = authService.SignUp(req.body as IUserInputDTO);

    next(new HttpException(400, 'Wrong email'));
  });

  return router;
};
