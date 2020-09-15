import { Service } from 'typedi';
import { User } from '../entities/User';
import HttpException from '../exceptions/HttpException';
import logger from '../loaders/logger';

@Service()
export default class UserService {
  public async findUser(email: string): Promise<User> {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        throw new HttpException(404, 'User with this email not found.');
      }

      return user;
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
