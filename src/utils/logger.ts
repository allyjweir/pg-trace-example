import * as winston from 'winston';
import { getEnv } from './getEnv';
const { combine, timestamp, label, printf } = winston.format;

const level = getEnv('LOG_LEVEL');

const myFormat = printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

export default winston.createLogger({
    format: combine(
        label({ label: level }),
        timestamp(),
        myFormat,
    ),
    transports: [
        new winston.transports.Console({ level }),
    ],
});
