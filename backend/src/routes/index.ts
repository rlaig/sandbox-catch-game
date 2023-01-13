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
      res.json({
        status: 'ok',
        response: result
       })
    } catch (error) {
      res.json({ 
        status: 'error',
        error
      })
    }
  })

  // register scores api routes
  app.use(scoresApi(database, connection))

  // register 404 if not found
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