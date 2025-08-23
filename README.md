# fastify-template-postgres

Fastify template for a local Node.js web server backed by PostgreSQL.

## Stack

- Fastify for the HTTP server
- pg for the PostgreSQL client
- node-pg-migrate for schema migrations
- Docker Compose for running the local Postgres instance

## Prerequisites

- Node.js and npm
- Docker and Docker Compose

Install dependencies before starting the app:

```bash
npm install
```

## Environment

The local environment variables live in `env/local.env`.

Default local database settings:

- Host: `localhost`
- Port: `5432`
- Database: `default`
- User: `postgres`

## Start PostgreSQL With Docker

This project uses Docker Compose to start the local Postgres container.

Start the container:

```bash
npm start
```

Stop the container and remove local volumes:

```bash
npm run stop
```

## Start The Web Server

The Fastify server runs locally and listens on `http://localhost:3000`.

Load the variables from `env/local.env`, then start the server:

```bash
npm run local node index.js
```

If you want to use the existing npm wrapper for local development:

```bash
npm run start:dev
```

That script expects a local development workflow that injects the values from `env/local.env` before starting the server.

## Migrations With node-pg-migrate

This repo exposes `node-pg-migrate` through the `migrate` script:

```bash
npm run migrate -- <command>
```

### Create a migration

Create a new timestamped migration file in the `migrations` directory:

```bash
npm run migrate -- create add-users-table --migrations-dir migrations
```

### Run pending migrations

Apply all pending migrations using the `POSTGRES_URL` value from `env/local.env`:

```bash
npm run local npm run migrate -- up --migrations-dir migrations --database-url-var POSTGRES_URL
```

### Roll back the latest migration

```bash
npm run local npm run migrate -- down --migrations-dir migrations --database-url-var POSTGRES_URL
```

Using the wrapper keeps the migration entrypoint consistent with the project script in `package.json`.

## Routes

The app registers these useful routes:

- `GET /` returns a basic server message.
- `GET /heartbeat` confirms the Fastify process is running.
- `GET /health` checks both the web server and PostgreSQL connectivity.

Examples:

```bash
curl http://localhost:3000/heartbeat
curl http://localhost:3000/health
```

## Reference Docs

- Fastify docs: https://fastify.dev/docs/latest/
- pg docs: https://node-postgres.com/
- node-pg-migrate docs: https://salsita.github.io/node-pg-migrate/
