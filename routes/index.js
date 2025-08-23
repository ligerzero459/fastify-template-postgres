const path = require('path')
const filename = path.basename(__filename)
const logger = require('../lib/log').child({ module: filename })

async function indexRoutes(fastify) {
  const db = await require('../lib/db').getClient()

  // Root route
  fastify.get('/', async() => {
    logger.info('Root route accessed')
    return { message: 'Fastify server is running!' }
  })

  // Heartbeat route that returns 200 when server is running
  fastify.get('/heartbeat', async() => {
    logger.info('Heartbeat check requested')
    return { status: 'ok', message: 'Server is running' }
  })

  fastify.get('/health', async() => {
    logger.info('Health check requested')
    try {
      await db.query('SELECT 1') // Check database connectivity
      return { status: 'ok', message: 'Server and database are healthy' }
    } catch (err) {
      logger.error({ err }, 'Health check failed')
      return { status: 'error', message: 'Database connection failed' }
    }
  })
}

module.exports = indexRoutes
