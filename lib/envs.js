const path = require('path')
const filename = path.basename(__filename)
const logger = require('./log').child({ module: filename })
const envs = {}

exports.get = function(env, silenced) {
  if (envs[env] === undefined) {
    if (process.env[env.toUpperCase()]) {
      envs[env] = process.env[env.toUpperCase()]
      return envs[env]
    } else {
      if (!silenced) {
        logger.error(`Environment variable ${env.toUpperCase()} is not set.`)
        return undefined
      }
    }
  } else {
    return envs[env]
  }
}
