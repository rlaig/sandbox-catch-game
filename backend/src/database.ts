import { r } from 'rethinkdb-ts'
import { config } from './config'

export default async function() {
  const database = r
  console.log('[db-connect] connecting...')
  const connection = await database.connect(config.connectionOptions)
  .then((connect)=>{
    console.log('[db-connect] done')
    return connect
  })
  return {database, connection}
}