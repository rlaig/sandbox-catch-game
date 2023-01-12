import type { Express, Request, Response } from 'express';
import type { R, Connection } from 'rethinkdb-ts'
import scoresApi from './scores'

export const registerRoutes = async (
  app: Express,
  database: R,
  connection: Connection
) => {

  app.get('/setup', async (req: Request, res: Response) => {
    try {
      const result = await database.db('test').tableCreate('scores').run(connection)
      res.json({ result })
    } catch (error) {
      res.json({ error })
    }
  })

  app.use(scoresApi(database, connection))

  // default 404 if not found
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