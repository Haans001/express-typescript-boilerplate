import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { IUserInputDTO } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import config from '../config';
import logger from '../loaders/logger';

@Service()
export default class AuthService {
  public async SignUp(userInputDto: IUserInputDTO) {
    const salt = 10;

    try {
      const hashedPassword = await bcrypt.hash(userInputDto.password, salt);

      const userRecord = User.create({
        ...userInputDto,
        password: hashedPassword,
      });

      if (!userRecord) {
        throw new Error('User Cannot Be Created');
      }

      logger.info('Saving user entity...');
      userRecord.save();

      const token = this.generateToken(userRecord);

      Reflect.deleteProperty(userRecord, 'password');

      return {
        user: userRecord,
        token,
      };
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  private generateToken(user: User) {
    logger.info('Generating token');
    return jwt.sign(
      {
        userID: user.id,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expires,
      },
    );
  }

  private verifyToken(token: string) {
    logger.info('Verifying Token');
    return jwt.verify(token, config.jwt.secret);
  }
}
