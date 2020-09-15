import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import HttpException from '../../exceptions/HttpException';
import AuthService from '../../services/auth';

export default (asMiddleware = true) => (req: Request, res: Response, next: NextFunction) => {
  let { authorization } = req.headers;

  if (
    (authorization && authorization.split(' ')[0] === 'Token') ||
    (authorization && authorization.split(' ')[0] === 'Bearer')
  ) {
    authorization = authorization.split(' ')[1];
  }

  const authService = Container.get(AuthService);
  const authenticated = authService.VerifyUser(authorization);

  if (authenticated) {
    if (asMiddleware) return next();
    res.status(200).json({ message: 'User is authenticated' });
  } else {
    next(new HttpException(401, 'User is not authenticated'));
  }
};
