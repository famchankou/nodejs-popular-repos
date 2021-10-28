import {
  createLogger,
  transports,
  format,
} from 'winston';

const { combine, timestamp, printf, json } = format;

export const logger = createLogger({
  format: combine(
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss'
    }),
    json(),
    printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
  ),
  transports: [
    new transports.Console(),
  ]
});
