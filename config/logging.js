const winston = require('winston');
const { combine, timestamp, printf, json, colorize, align } = winston.format;

const errorFilter = winston.format((info, opts) => {
    return info.level === 'error' ? info : false;
});

const infoFilter = winston.format((info, opts) => {
    return info.level === 'info' ? info : false;
});


module.exports = function() {
    const loggers =
        winston.createLogger({
            level: process.env.LOG_LEVEL || 'info',
            format: combine(
                colorize({ all: true }),
                timestamp({
                    format: 'DD-MM-YYYY hh:mm:ss.SSS A',
                }),
                align(),
                printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
            ),
            transports: [
                new winston.transports.File({
                    filename: 'combined.log',
                }),
                new winston.transports.File({
                    filename: 'app-error.log',
                    level: 'error',
                    format: combine(errorFilter(), timestamp(), json()),
                }),
                new winston.transports.File({
                    filename: 'app-info.log',
                    level: 'info',
                    format: combine(infoFilter(), timestamp(), json()),
                }),
            ],
        })

    loggers.info('Info message');
    loggers.error('Error message');
    loggers.warn('Warning message');
}