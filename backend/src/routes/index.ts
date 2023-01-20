import type { Express, Request, Response } from 'express';
import type { R, Connection } from 'rethinkdb-ts'
import healthApi from './health.route'
import scoresApi from './scores.route'

export const registerRoutes = async (
  app: Express,
  database: R,
  connection: Connection
) => {
  // setup route
  app.get('/setup', async (req: Request, res: Response) => {
    try {
      const tableCreateResult = await database.db('test').tableCreate('scores').run(connection)
      const tableIndexCreate = await database.table('scores').indexCreate('score').run(connection)
      res.json({
        status: 'ok',
        response: [tableCreateResult, tableIndexCreate]
       })
    } catch (error) {
      res.json({
        status: 'error',
        error
      })
    }
  })

  // register api routes
  app.use(scoresApi(database, connection))
  app.use(healthApi())

  // default register 404 if not found
  app.use((req, res, next) => {
    res.status(404);

    res.format({
      json: function () {
        res.json({ error: 'Not found' })
      },
      default: function () {
        res.type('txt').send('Not found')
      }
    })
  })
  return app;
};
