import type { Express, Request, Response } from 'express';
import type { R, Connection } from 'rethinkdb-ts'

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
  app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'get default' })
  })
  app.get('/scores', async (req: Request, res: Response) => {
    try {
      const result = await database.table('scores').run(connection)
      res.json({
        results: result
      })
    } catch (err) {
      res.json({err})
    }
    res.json({ message: 'get scores' })
  })
  return app;
};