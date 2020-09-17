import { Repository } from 'typeorm';
import { User } from '../../src/entities/User';
import { IUserInputDTO } from '../../src/interfaces/IUser';
import AuthService from '../../src/services/auth';
import UserService from '../../src/services/user';

describe('Authentication Service', () => {
  describe('SignUp', () => {
    it('Should be ok', async () => {
      const userDto = {
        userName: 'jasiek',
        email: 'jan.rapacz@interia.pl',
        password: 'jasiu123',
      } as IUserInputDTO;

      const userRepository = new Repository<User>();
      userRepository.create = jest.fn().mockReturnValue({
        ...userDto,
        id: 1,
      });

      const userService = new UserService();

      userRepository.save = jest.fn().mockReturnValue(Promise.resolve());
      const authService = new AuthService(userService, userRepository);

      const { user, token } = await authService.SignUp(userDto);

      expect(userRepository.save).toBeCalled();
      expect(userRepository.create).toBeCalled();

      expect(user.email).toBe(userDto.email);
      expect(token.length).toBeGreaterThan(10);
    });
  });
});
