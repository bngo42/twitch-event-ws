import { Server } from 'socket.io';

let io;

export function createWsServer(port = 8083) {
  io = new Server(port, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    socket.emit('message', { type: 'welcome', message: 'Connected to the socket server' });
  });

  console.log(`Socket server started on port ${port}`);
  return io;
}

export { io };
