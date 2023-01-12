import { r } from 'rethinkdb-ts'
import { config } from './config'

export default async function() {
  const connectionOptions = config.connectionOptions
  const database = r
  console.log('[db-connect] connecting...')
  const connection = await database.connect(connectionOptions)
  .then((connect)=>{
    console.log('[db-connect] done')
    return connect
  })
  .catch((err)=>{
    console.log('[db-connect] error')
    return err
  })
  return {database, connection}
}