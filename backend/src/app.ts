import express, { Express } from 'express'
import bodyParser from 'body-parser'
import { registerRoutes } from './routes';
import type { R, Connection } from 'rethinkdb-ts'

export const initApp = async (database: R, connection: Connection) => {
  const app: Express = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  await registerRoutes(app, database, connection);
  return app;
};
