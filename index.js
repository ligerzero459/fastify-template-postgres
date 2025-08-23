const path = require('path')
const filename = path.basename(__filename)
const logger = require('./lib/log.js')
const DB = require('./lib/db.js')
const fastify = require('fastify')({
  loggerInstance: logger.child({ module: filename })
})

// Register routes
fastify.register(require('./routes/index'))

process.on('SIGTERM', onSignal)
process.on('SIGINT', onSignal)

fastify.addHook('onClose', async(instance) => {
  logger.info('Fastify server is shutting down...')
  const db = await DB.getClient()
  await db.end()
})

// Start the server
const start = async() => {
  try {
    const db = await DB.getClient()
    await Promise.all([
      fastify.listen({ port: 3000, host: '0.0.0.0' })
    , db.connect()
    ])

    logger.info('Server is running on http://localhost:3000')
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

async function close() {
  await fastify.close()

  process.exit(0)
}

function onSignal(signal) {
  logger.warn({ signal }, 'Received shutdown signal, shutting down gracefully...')
  close()
}

start()
