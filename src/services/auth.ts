import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { IUserInputDTO } from '../interfaces/IUser';
import bcrypt from 'bcrypt';
import { User } from '../entities/User';
import config from '../config';
import logger from '../loaders/logger';
import UserService from './user';
import HttpException from '../exceptions/HttpException';

@Service()
export default class AuthService {
  constructor(private userService: UserService) {}

  public async SignUp(userInputDto: IUserInputDTO): Promise<{ user: User; token: string }> {
    const salt = 10;

    try {
      const hashedPassword = await bcrypt.hash(userInputDto.password, salt);
      logger.info(hashedPassword);
      const userRecord = User.create({
        ...userInputDto,
        password: hashedPassword,
      });

      if (!userRecord) {
        throw new HttpException(500, 'User Cannot Be Created');
      }

      logger.info('Saving user entity...');
      await userRecord.save();

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

  public async SignIn(email: string, password: string): Promise<{ user: User; token: string }> {
    try {
      logger.info('Signing in.');
      const user = await this.userService.findUser(email);
      console.log(user);

      const match = await bcrypt.compare(password, user.password);
      logger.info('Is password matching: ' + match);

      if (match) {
        Reflect.deleteProperty(user, 'password');
        const token = this.generateToken(user);

        return { user, token };
      } else {
        throw new HttpException(401, 'Wrong Password');
      }
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public VerifyUser(token: string) {
    return this.verifyToken(token);
  }

  private generateToken(user: User): string {
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
