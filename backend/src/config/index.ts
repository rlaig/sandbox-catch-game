import { configOptions } from  '../types'

export const config: configOptions = {
  socketPort: 3000,
  socketConfig: {
    cors: {
      origin: '*'
    }
  },
  port: 3010,
  connectionOptions: {
    server: {
      host: '138.128.124.137',
      port: 28015
    },
    db: 'test'
  }
}