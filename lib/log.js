const pino = require('pino')

// Create and configure the logger with pino-pretty
const logger = pino({
  level: 'info'
  , transport: {
    target: 'pino-pretty'
    , options: {
      colorize: true
    }
  }
})

module.exports = logger
