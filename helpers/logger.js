const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log', level: 'error' }), 
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Define a stream object with a write function that logs to the logger
logger.stream = {
  write: function(message) {
    logger.info(message.trim());
  }
};

module.exports = logger;
