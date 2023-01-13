import type { RConnectionOptions } from 'rethinkdb-ts'
import type { ServerOptions } from 'socket.io'

export type configOptions  = {
  socketPort: number,
  socketConfig: Partial<ServerOptions>,
  port: number,
  connectionOptions: RConnectionOptions
} 