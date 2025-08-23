const pg = require('pg')
const envs = require('./envs')

let dbClient

async function getClient() {
  if (!dbClient) {
    dbClient = new pg.Client({
      connectionString: envs.get('POSTGRES_URL')
    , user: envs.get('POSTGRES_USER')
    , password: envs.get('POSTGRES_PASSWORD')
    , database: envs.get('POSTGRES_DB')
    })
  }

  return dbClient
}

module.exports = {
  getClient
}
