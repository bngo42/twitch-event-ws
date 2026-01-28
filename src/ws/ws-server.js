import { WebSocketServer } from 'ws';
import { registerClient, unregisterClient } from './ws-client.js';

export function createWsServer(port = 8080) {
  const wss = new WebSocketServer({ port });

  wss.on('connection', (socket) => {
    registerClient(socket);
    socket.send(JSON.stringify({ type: 'welcome', message: 'Connected to ws' }));

    socket.on('close', () => {
      unregisterClient(socket);
    });
  });

  console.log(`WebSocket server started on port ${port}`);
  return wss;
}