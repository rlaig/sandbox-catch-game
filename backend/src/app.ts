import express from 'express'
import bodyParser from 'body-parser'
import { registerRoutes } from './routes';
import initDb from './database';
import type { R, Connection } from 'rethinkdb-ts'

export default async function(database: R, connection: Connection) {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  await registerRoutes(app, database, connection);

  return app;
}