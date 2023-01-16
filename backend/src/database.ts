import { r, RethinkDBErrorType } from 'rethinkdb-ts'
import type { RethinkDBError } from 'rethinkdb-ts/lib/error/error'
import { config } from './config'

export default async function() {
  const database = r
  console.log(`[rethinkdb] connecting ${config.connectionOptions.server.host}:${config.connectionOptions.server.port} db:${config.connectionOptions.db}`)
  const connection = await database.connect(config.connectionOptions)
  .then((connect)=>{
    console.log('[rethinkdb] connected')
    return connect
  }).catch(function(err: RethinkDBError) {
    console.log(`[rethinkdb] [${RethinkDBErrorType[err.type]}] ${err.msg}`)
    return null
  })
  return {database, connection}
}