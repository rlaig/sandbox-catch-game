import { R, r as rethinkdb, RConnectionOptions } from 'rethinkdb-ts'
import { config } from './config'

export const initDatabase = async () => {
  const connectionOptions: RConnectionOptions = config.connectionOptions
  const database: R = rethinkdb
  const connection = await database.connect(connectionOptions)

  connection.on('connect', (stream) => {
    console.log('connect event', stream)
  })

  return {database, connection};
};