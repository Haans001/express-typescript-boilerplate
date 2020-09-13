import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import HttpException from '../../exceptions/HttpException';

export default (validationSchema: ValidationChain[]) => [...validationSchema, validate];

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errorsArray = validationResult(req).array();
  if (errorsArray.length) {
    const errors = errorsArray.reduce((acc, error) => {
      const { param, value, msg } = error;

      return {
        ...acc,
        [param]: {
          value,
          message: msg,
        },
      };
    }, {});

    return next(new HttpException(422, 'Validation Error.', errors));
  }
  return next();
};
