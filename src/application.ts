import * as express from 'express';
import * as morgan from 'morgan';
import exampleRouter from './exampleRouter';
import logger from './utils/logger';
import { getEnv } from './utils/getEnv';

export default (database) => {
    const app = express();

    app.locals.pg = database;
    app.locals.logger = logger;

    if (!process.env.SUPPRESS_LOGS) app.use(morgan(getEnv('LOG_FORMAT_MORGAN')));

    app.use(express.json({ limit: '500kb' }));
    app.use('/example', exampleRouter);

    return app;
};
