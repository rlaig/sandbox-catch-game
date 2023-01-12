import type { Server } from 'socket.io'
import type { R, Connection, RethinkDBError } from 'rethinkdb-ts'

export default async function (io: Server, database: R, connection: Connection) {
  const callback = (err: RethinkDBError | undefined, row: any) => {
    io.emit('scoreUpdated', row)
    console.log('[socket-emit] scoreUpdated callback', row)
  }
  (await database.table('scores').changes().run(connection)).each(callback)
  
  return {database, connection};
}