import { config } from './config'
import { Server as socketio } from 'socket.io'

import initDb from './database';
import initApp from './app';
import initSocket from './socket';

const main = async () => {
  try {
    const io = new socketio(config.socketPort, config.socketConfig)
    const {database, connection} = await initDb()

    if (connection.open) {
      const app = await initApp(database, connection)
      await initSocket(io, database, connection)
      app.listen(config.port, async () => {
        console.log(`Server is running at http://localhost:${config.port}`)
      })
    }
  } catch (err) {
    console.error('[something went wrong] ', err);
  }
};

main();