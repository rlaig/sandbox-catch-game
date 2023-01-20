import { Router, Request, Response } from 'express';
import type { R, Connection } from 'rethinkdb-ts'
import { ScoresController } from '../controllers/scores.controller'

export default (
  database: R,
  connection: Connection
) => {
  const router = Router()
  const controller = ScoresController(database, connection)

  router.get('/scores', async (req: Request, res: Response) => {
    const results = await controller.getScores(req)
    res.json(results)
  })

  router.post('/scores/add', async (req: Request, res: Response) => {
    const results = await controller.postScoresAdd(req)
    res.json(results)
  })

  router.get('/scores/reset', async (req: Request, res: Response) => {
    const results = await controller.getScoresReset(req)
    res.json(results)
  })

  return router
}
