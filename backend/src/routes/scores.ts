import { Router } from 'express';
import type { Request, Response } from 'express';
import type { R, Connection } from 'rethinkdb-ts'

export default (
  database: R,
  connection: Connection
) => {
  const router = Router()

  router.get('/scores', async (req: Request, res: Response) => {
    try {
      const result = await database.table('scores').run(connection)
      res.json({
        results: result
      })
    } catch (err) {
      res.json({err})
    }
  })

  router.get('/scores/add/:score', async (req: Request, res: Response) => {
    try {
      const payload = {
        name: 'anonymous',
        score: req.params.score
      }
      const result = await database.table('scores').insert(payload).run(connection)
      res.json({
        params: req.params,
        payload: payload,
        results: result
      })
    } catch (err) {
      res.json({err})
    }
  })

  router.get('/scores/reset', async (req: Request, res: Response) => {
    try {
      const result = await database.table('scores').delete().run(connection)
      res.json({
        results: result
      })
    } catch (err) {
      res.json({err})
    }
  })

  return router
}