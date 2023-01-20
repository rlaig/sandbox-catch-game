import type { R, Connection } from 'rethinkdb-ts'
import {Request } from 'express'

export const ScoresController = (
  database: R,
  connection: Connection
) => {

  const getScores = async(req: Request) => {
    try {
      const results = await database.table('scores').orderBy({index: database.desc('score')}).limit(100).run(connection)
      return {
        status: 'ok',
        response: results
      }
    } catch (err) {
      return {
        status: 'error',
        message: err
      }
    }
  }

  const postScoresAdd = async(req: Request) => {
    try {
      const { name, score } = req.body
      if (score && !Number.isInteger(score)) {
        return {
          status: 'error',
          message: 'invalid score'
        }
      }
      if (name == undefined || score == undefined)
        return {
          status: 'error',
          message: 'invalid request'
        }
      else {
        const payload = {
          name: String(name),
          score: parseInt(score)
        }
        const results = await database.table('scores').insert(payload).run(connection)
        return {
          status: 'ok',
          results: results
        }
      }
    } catch (err) {
      return {
        status: 'error',
        message: err
      }
    }
  }

  const getScoresReset = async(req: Request) => {
    try {
      const results = await database.table('scores').delete().run(connection)
      return {
        status: 'ok',
        response: results
      }
    } catch (err) {
      return {
        status: 'error',
        message: err
      }
    }
  }


  return {
    getScores,
    postScoresAdd,
    getScoresReset,
  }
}
