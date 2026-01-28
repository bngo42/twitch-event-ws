const WS_OPEN = 1;
const clients = new Set();

export const registerClient = (socket) => {
  clients.add(socket);
};

export const unregisterClient = (socket) => {
  clients.delete(socket);
};

export const broadcast = (payload) => {
  const data = JSON.stringify(payload);
  clients.forEach(client => {
    if (client.readyState === WS_OPEN) {
      client.send(data);
    }
  });
};