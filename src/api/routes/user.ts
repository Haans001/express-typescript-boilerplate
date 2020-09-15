import { Router, Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserService from '../../services/user';

export default (): Router => {
  const router = Router();

  router.get('/user/:email', async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    try {
      const userService = Container.get(UserService);
      const user = await userService.findUser(email);
    } catch (error) {
      next(error);
    }
  });
  return router;
};
