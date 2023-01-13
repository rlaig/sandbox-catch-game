import express from 'express'
import bodyParser from 'body-parser'
import { registerRoutes } from './routes';
import type { R, Connection } from 'rethinkdb-ts'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

export default async function(database: R, connection: Connection) {
  const app = express()

  app.use(helmet())
  app.use(compression())
  app.use(cors())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  await registerRoutes(app, database, connection);
  return app;
}