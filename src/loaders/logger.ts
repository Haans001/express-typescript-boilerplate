import winston, { format } from 'winston';

const colorizer = format.colorize();

const alignedWithColorsAndTime = format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => {
    const { timestamp, level, message, ...args } = info;

    const ts = timestamp.slice(0, 19).replace('T', ' ');

    const output = `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ''}`;
    return colorizer.colorize(level, output);
  }),
);

const logger = winston.createLogger({
  format: alignedWithColorsAndTime,
  transports: [new winston.transports.Console()],
});

export default logger;
