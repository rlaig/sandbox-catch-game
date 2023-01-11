import { initDatabase } from './database';
import { initApp } from './app';
import { config } from './config'
import { Server } from 'socket.io'

const main = async () => {
  try {
    const { database, connection } = await initDatabase();
    const app = await initApp(database, connection);
    const io = new Server(3000)

    app.listen(config.port, async () => {
      console.log(`Server is running at http://localhost:${config.port}`)
    })
  } catch (err) {
    console.error(err);
  }
};

main();