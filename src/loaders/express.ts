import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config';
import api from '../api/index';
import errorMiddleware from '../api/middlewares/errorMiddleware';
import methodOverride from 'method-override';
import HttpException from '../exceptions/HttpException';
import logger from './logger';

export default (app: Application) => {
  app.use(cors());

  app.use(methodOverride());

  app.use(bodyParser.json());

  app.use(config.apiPrefix, api());

  app.use((req, res, next) => {
    const err = new HttpException(404, 'Not Found');
    next(err);
  });

  app.use(errorMiddleware);

  logger.info('Express middlewares loaded.');
};
