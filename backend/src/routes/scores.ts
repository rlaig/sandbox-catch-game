import { Router, Request, Response } from 'express';
import type { R, Connection } from 'rethinkdb-ts'

export default (
  database: R,
  connection: Connection
) => {
  const router = Router()

  router.get('/scores', async (req: Request, res: Response) => {
    try {
      const results = await database.table('scores').orderBy('score').run(connection, {arrayLimit: 100})
      res.json({
        status: 'ok',
        response: results
      })
    } catch (err) {
      res.json({
        status: 'ok',
        message: err
      })
    }
  })

  router.post('/scores/add', async (req: Request, res: Response) => {
    try {
      const { name, score } = req.body
      console.log(req.body)
      if (score && !Number.isInteger(score)) {
        res.json({
          status: 'error',
          message: 'invalid score'
        })
        return
      }
      if (name == undefined || score == undefined)
        res.json({
          status: 'error',
          message: 'invalid request'
        })
      else {
        const payload = {
          name: String(name),
          score: parseInt(score)
        }
        const results = await database.table('scores').insert(payload).run(connection)
        res.json({
          status: 'ok',
          results: results
        })
      }
    } catch (err) {
      res.json({
        status: 'error',
        message: err
      })
    }
  })

  router.get('/scores/reset', async (req: Request, res: Response) => {
    try {
      const results = await database.table('scores').delete().run(connection)
      res.json({
        status: 'ok',
        response: results
      })
    } catch (err) {
      res.json({
        status: 'ok',
        message: err
      })
    }
  })

  return router
}