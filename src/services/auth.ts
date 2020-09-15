import jwt from 'jsonwebtoken';
import { Service } from 'typedi';
import { getManager } from 'typeorm';
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

      await userRecord.save();

      logger.info(userRecord);
      Reflect.deleteProperty(userRecord, 'password');

      const token = this.generateToken(userRecord);

      return { user: userRecord, token };
    } catch (error) {
      throw error;
    }
  }

  private generateToken(user: User) {
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
}
