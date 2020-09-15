import { check } from 'express-validator';
import { getRepository } from 'typeorm';
import { User } from '../../entities/User';
import logger from '../../loaders/logger';

export default [
  check('password')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,12}$/)
    .withMessage('Password must be at least 5 characters and must include at least one upper case letter and digit.'),
  check('email').isEmail().withMessage('Invalid email format'),
  check('userName')
    .matches(/(?=^.{6,51}$)([A-Za-z]{1})([A-Za-z0-9!@#$%_\^\&amp;\*\-\.\?]{5,49})$/)
    .withMessage(
      'User name must be at least 6 characters long,cannot contain spaces and must begin with an alpha character.',
    ),
  check('repeatPassword')
    .custom((value, { req }) => value === req.body.password && !(value.length === 0 || req.body.password.length === 0))
    .withMessage("Passwords don't match."),
  check('email')
    .custom(async value => {
      const userRepository = getRepository(User);
      const user = await userRepository.findOne({ email: value });
      if (user) {
        return Promise.reject('E-mail already in use.');
      }
    })
    .withMessage('E-mail already in use.'),
];
