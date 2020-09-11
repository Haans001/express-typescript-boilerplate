import { Application, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../config';
import api from '../api/index';
import errorMiddleware from '../api/middlewares/errorMiddleware';
import methodOverride from 'method-override';

export default (app: Application) => {
  app.use(cors());

  app.use(methodOverride());

  app.use(bodyParser.json());

  app.use(config.apiPrefix, api());

  app.use(errorMiddleware);
};
