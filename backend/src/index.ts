import { config } from './config'
import { Server as socketio } from 'socket.io'

import initDb from './database';
import initApp from './app';
import initSocket from './socket';


const main = async () => {
  try {
    const io = new socketio(3000, {
      cors: {
        origin: '*'
      }
    })
    const {database, connection} = await initDb()
    const app = await initApp(database, connection)
    if (connection.open) {
      await initSocket(io, database, connection)
    }

    app.listen(config.port, async () => {
      console.log(`Server is running at http://localhost:${config.port}`)
    })
  } catch (err) {
    console.error('fail to run server', err);
  }
};

main();