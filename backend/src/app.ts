import express from 'express'
import bodyParser from 'body-parser'
import { registerRoutes } from './routes';
import type { R, Connection } from 'rethinkdb-ts'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

export default async function(database: R, connection: Connection) {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use(compression())
  app.use(helmet())
  app.use(cors())

  await registerRoutes(app, database, connection);
  return app;
}