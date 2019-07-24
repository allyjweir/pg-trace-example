import './honeycomb';
import { getEnv } from './utils/getEnv';
import application from './application';
import logger from './utils/logger';
import db from './db';
import * as process from 'process';

const port = getEnv('PORT');
const database = db();
const app = application(database);
app.listen(port, () => logger.info(`Server running at port ${port} on PID: ${process.pid}`));
