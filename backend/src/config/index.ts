import type { RConnectionOptions } from 'rethinkdb-ts'
type configOptions = {
  port: number,
  connectionOptions: RConnectionOptions
}
export const config: configOptions = {
  port: 3010,
  connectionOptions: {
    server: {
      host: '138.128.124.137',
      port: 28015
    }
  }
}