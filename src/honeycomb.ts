import * as beeline from 'honeycomb-beeline';
import debug from 'debug';
import { getEnv } from './utils/getEnv';

const logger = debug('honeycomb-initialiser');
logger.enabled = true;

logger('Starting honeycomb');
beeline({
    writeKey: getEnv('HONEYCOMB_WRITE_KEY'),
    dataset: getEnv('HONEYCOMB_DATASET'),
    serviceName: 'pg-trace',
    impl: getEnv('HONEYCOMB_ENABLED', false) ? undefined : 'mock',
});
